var DEBUG = 0;

var CryptoJS  = require('crypto-js');
var Promise   = require("bluebird");
var request   = require('request-promise');
var colors    = require('colors');

var config    = require('../config');
var endpoints = require('./endpoints');

var log = function() { DEBUG && console.log(...arguments) };

function buildRequestBody(endpointParams, userData = {})
{
  var params = {
    timestamp: Date.now(),
    access_token: config.bringgAccessToken
  };

  var endpointAllowedNames = Object.keys(endpointParams);

  params = Object.keys(userData).filter(name => ~endpointAllowedNames.indexOf(name))
  .reduce((params, name) => {
    var typeConverter = endpointParams[name];
    params[name] = typeConverter(userData[name] || '');
    return params;
  }, params);

  var query_params = Object.keys(params)
  .map(name => name + '=' + encodeURIComponent(params[name])).join('&');

  params.signature = CryptoJS.HmacSHA1(query_params, config.bringgSecretKey).toString();

  return params;
}

var produceEndpointInterface = (method, endpoint) => userData => {
  var uri = config.bringgAPIURI + endpoint.path;
  var body = buildRequestBody(endpoint.postParams, userData);

  log('Send request:'.green, {method, uri, body, json: true });

  return request({method, uri, body, json: true })
  .then(parsedBody => {
    if (method === 'GET')
      return Promise.resolve(parsedBody);

    var responseData = parsedBody[endpoint.respBodyName];

    if (parsedBody.success && responseData)
      return Promise.resolve(responseData);

    log('Bad response:'.red, parsedBody);
    return Promise.reject('Bad api response :\'(');
  });
};

module.exports = {
  getTasks      : produceEndpointInterface('GET',  endpoints.tasks),
  postCustomers : produceEndpointInterface('POST', endpoints.customers),
  postTasks     : produceEndpointInterface('POST', endpoints.tasks)
};
