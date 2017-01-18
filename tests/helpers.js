const test = require('tape');
const endpoint = require('../lib/endpoint');
const helpers = require('../lib/helpers');

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
      t.fail(error.statusCode);
    } else {
      t.ok(results.length > 0);
    }
  });
});
