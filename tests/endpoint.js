const test = require('tape');
const endpoint = require('../lib/endpoint');

test('Endpoints - Base URL', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.base(), 'string');
});

test('Endpoints - SIS - Imports', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.sis.imports(), 'string');
});

test('Endpoints - SIS - Upload', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.sis.upload(), 'string');
});

test('Endpoints - Course - Migrate', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.course.migrate(123), 'string');
});
