var NEXT_ORDER_DELAY = 30 * 1000; // to protect server from multiple posts

var express = require('express');
var colors  = require('colors');

var Customer     = require('../../models/customer');
var bringgClient = require('../../bringg-api/client');

function allowNextOrder(orders)
{
  var lastOrder = orders[orders.length - 1];

  if (!lastOrder)
    return true;

  return Date.now() > Date.parse(lastOrder.date) + NEXT_ORDER_DELAY;
}

function createBringgCustomer(customer)
{
  return bringgClient.postCustomers({
    name:    customer.name,
    address: customer.address,
    phone:   customer.phone
  })
  .then(newCustomer => {
    console.log('New bringg customer created!'.green, `ID${newCustomer.id}`);
    customer.bringgId = newCustomer.id;
    customer.save();
    return Promise.resolve(customer);
  });
}

function postBringgTask(customer)
{
  var order = customer.orders[customer.orders.length - 1];

  return bringgClient.postTasks({
    customer_id: customer.bringgId,
    address: order.address,
    note: order.message,
    asap: true
  })
  .then(newTask => {
    console.log('Bringg task posted!'.green, `ID${newTask.id}`);
    order.bringgId = newTask.id;
    customer.save();
    return Promise.resolve(customer);
  });
}

var router = express.Router();

router.get('/', function(req, res, next) {
  var phone = req.query.phone;

  if (!req.query.phone)
    return next('Please, specify `phone` value in the URI query.');

  Customer.findOne({ phone })
  .then( customer => {
    var orders = customer.orders.map(order => ({
      date:    order.date,
      name:    order.name,
      address: order.address,
      message: order.message
    }));

    res.json({ status: 'success', data: orders });
  });
});

router.post('/', function(req, res) {
  var errorMessage;

  ['name', 'phone', 'address'].every(fieldName => {
    if (req.body[fieldName])
      return true;
    errorMessage = `Field "${fieldName}" is empty.`;
  });

  if (errorMessage)
    return next(errorMessage);

  userOrder = { name: req.body.name, address: req.body.address,
    phone: req.body.phone };

  if (req.body.message)
    userOrder.message = req.body.message;

  Customer.findOne({ phone: userOrder.phone })
  .then( customer => {
    if (customer && !allowNextOrder(customer.orders))
      return next('Waiting some time from previous order.');

    if (!customer) {
      customer = new Customer({
        name:    userOrder.name,
        address: userOrder.address,
        phone:   userOrder.phone,
        orders:  [userOrder]
      });
    }
    else {
      customer.name = userOrder.name;
      customer.address = userOrder.address;
      customer.orders.push(userOrder);
    }

    customer.save()
    .then(() => {
      res.json({ status: 'success', message: 'Order saved.' });
    })
    .catch(() => {
      next('Could not save order.');
    });

    if (!customer.bringgId)
      createBringgCustomer(customer)
      .then(postBringgTask);
    else
      postBringgTask(customer);
  });
});

module.exports = router;
