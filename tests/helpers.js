const test = require('tape');
const endpoint = require('../lib/endpoint');
const helpers = require('../lib/helpers');
var nock = require('nock');
const config = require('../config');

// Dummy data used for Mocks
let source = 1;
let destination = 2;
let id = 3;
let courseid = 4;
let assignmentid = 5;
let nameresponse = 'Canvas API - Test Suite Assignment';
let res;


// Mock http calls

res = nock('https://'+config.domain+'/api/'+config.apiVersion)
  .get('/accounts/1/sub_accounts')
  .query(true)
  .reply(200, { id: id });

  
let options = {
  url: `${endpoint.base()}/accounts/1/sub_accounts`,
  data: {
    per_page: 2
  }
};

test('Common Helpers - Get All Resources', (t) => {
  t.plan(1);
  helpers.getAllResources(options, (error, results) => {
    if (error) {
      t.fail(error);
    } else {
      t.ok(results.length > 0);
    }
  });
});
