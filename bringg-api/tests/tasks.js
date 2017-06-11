var CUSTOMER_ID = 2257807;

var colors = require('colors');
var client = require('../client');

var rand = () => Math.random().toString(36).substring(2);

client.postTasks({
  customer_id: CUSTOMER_ID,
  address: rand(),
  asap: true,
  fakeParam: rand()
})
.then(newTask => {
  console.log('Task successfully created!'.green);
  console.log(newTask);
})
.catch(err => {
  console.log(`Something went wrong: ${err}`.red);
});


client.getTasks()
.then(tasks => {
  console.log('All tasks extracted!'.green);
  console.log(tasks);
})
.catch(err => {
  console.log(`Something went wrong: ${err}`.red);
});
