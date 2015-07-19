var test = require('tape');
var endpoints = require('../lib/endpoints');

var domain = process.env.CANVAS_API_DOMAIN;
var base = 'https://' + domain + '/api/v1/';
var urls = {
  imports: {
    user: base + 'accounts/self/sis_imports/',
    number: base + 'accounts/1/sis_imports/'
  },
  upload: {
    user: base + 'accounts/self/sis_imports.json?import_type=instructure_csv',
    number: base + 'accounts/1/sis_imports.json?import_type=instructure_csv'
  }
};

test('Canvas API - Endpoints - SIS Imports', function (t) {
  t.plan(3);
  t.equal(endpoints.sisImports(domain), urls.imports.user, 'Domain only');
  t.equal(endpoints.sisImports(domain, 'self'), urls.imports.user, 'Domain + \'self\'');
  t.equal(endpoints.sisImports(domain, '1'), urls.imports.number, 'Domain + \'1\'');
});

test('Canvas API - Endpoints - SIS Upload', function (t) {
  t.plan(3);
  t.equal(endpoints.sisUpload(domain), urls.upload.user, 'Domain only');
  t.equal(endpoints.sisUpload(domain, 'self'), urls.upload.user, 'Domain + \'self\'');
  t.equal(endpoints.sisUpload(domain, '1'), urls.upload.number, 'Domain + \'1\'');
});
