var test = require('tape');
var endpoints = require('../lib/endpoints');

var domain = process.env.CANVAS_API_DOMAIN;
var base = 'https://' + domain + '/api/v1/';
var urls = {
  user: base + 'accounts/self/sis_imports/',
  number: base + 'accounts/1/sis_imports/'
};

test('Canvas API - Endpoints - SIS Imports', function (t) {
  t.plan(3);
  t.equal(endpoints.sisImports(domain), urls.user, 'Domain only');
  t.equal(endpoints.sisImports(domain, 'self'), urls.user, 'Domain + \'self\'');
  t.equal(endpoints.sisImports(domain, '1'), urls.number, 'Domain + \'1\'');
});
