const request = require('sync-request');
const { Given, When, Then } = require('cucumber');
const fs = require('fs');
const expect = require('chai').expect;
const assert = require('chai').assert;
const chai = require('chai');
chai.use(require('chai-shallow-deep-equal'));

let baseUrl = "https://petstore.swagger.io/v2";
let req;
let data;
let parseData;

Given('JSON {string}', function (payload) {
  data = fs.readFileSync(`fixtures/${payload}`);
});

When('user sends a POST request to {string} endpoint', function (name) {
  parseData = JSON.parse(data);
  payloadData = JSON.stringify(parseData);
  req = request('POST', `${baseUrl}${name}`, {
      'headers': {
        'Content-Type': 'application/json'
      }, body: payloadData }
  );
});

When('user sends an invalid PATCH equest to {string} endpoint', function (name) {
  payloadData = JSON.stringify(parseData);
  req = request('PATCH', `${baseUrl}${name}`, {
    'headers': {
      'Content-Type': 'application/json'
    }, body: payloadData }
);
});

When('user sends an invalid POST request to {string} endpoint', function (name) {
  payloadData = JSON.stringify(parseData);
  req = request('POST', `${baseUrl}${name}`, {
      'headers': {
        'multipart': 'form-data'
      }, body: payloadData }
  );
});

Then('user sees successful response status code', function () {
  expect(req.statusCode).to.equal(200);
});

Then('JSON response matches {string}', function (payload) {
  const obj = JSON.parse(req.getBody().toString('utf8'));
  parseData = JSON.parse(data);
 assert.shallowDeepEqual(obj, parseData);
});

Then('user sees error message with status code {int}', function (code) {
  expect(req.statusCode).to.equal(code);
});

