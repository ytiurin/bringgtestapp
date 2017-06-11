## Requirements
NodeJS, MongoDB, Postman.

## Run
1. Clone this repository
   ```
   git clone git@github.com:ytiurin/bringgtestapp.git
   ```
2. Paste the provided `config.js` file to the app folder
3. Run MongoDB
4. Run the app
   ```
   DEBUG=bringgtestapp:* npm start
   ```
   
## Usage
Use Postman to send requests to the app API

To create order:
- send `POST` request to http://localhost:3000/api/orders with `x-www-form-urlencoded` parameters `name`, `phone`, `address` and `message` of any values
- the expected result is `JSON` response
  ```json
  {
    "status": "success",
    "message": "Order saved."
  }
  ```
  You should also see `New bringg customer created!` and `Bringg task posted!` messages in NodeJS terminal window

To get list of customer orders:
- send `GET` request to http://localhost:3000/api/orders?phone=111 where `phone` parameter should be the one you used to post the order
- the expected result is `JSON` response
  ```
  {
    "status": "success",
    "data": [
      {
        "date": "2017-06-10T20:28:38.452Z",
        "name": "Mike",
        "address": "my address",
        "message": "Latte, please."
      }
    ]
  }
  ```
  
