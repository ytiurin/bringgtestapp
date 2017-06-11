var colors = require('colors');
var client = require('../client');

var rand = () => Math.random().toString(36).substring(2);

client.postCustomers({
  name: rand(),
  address: rand(),
  phone: rand(),
  fakeParam: rand()
})
.then(newCustomer => {
  console.log('Customer successfully created!'.green);
  console.log(newCustomer);
})
.catch(err => {
  console.log(`Something went wrong: ${err}`.red);
});
