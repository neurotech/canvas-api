const test = require('tape');
const endpoint = require('../lib/endpoint');

// Base URL
test('Endpoints - Base URL', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.base(), 'string');
});

// SIS
test('Endpoints - SIS - Imports', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.sis.imports(), 'string');
});

test('Endpoints - SIS - Upload', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.sis.upload(), 'string');
});

// Course
test('Endpoints - Course - Migrate', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.course.migrate(123), 'string');
});

test('Endpoints - Course - Discuss', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.course.discuss(123), 'string');
});
// Assignment
test('Endpoints - Assignment - Create', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.assignment.create(123), 'string');
});

test('Endpoints - Assignment - Modify', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.assignment.modify(123, 45678), 'string');
});

test('Endpoints - Assignment - Search', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.assignment.search(123, 45678), 'string');
});


// Assignment
test('Endpoints - Modules - Create', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.cmodule.create(123), 'string');
});

test('Endpoints - Modules- Modify', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.cmodule.modify(123, 45678), 'string');
});

test('Endpoints - Modules - Search', (t) => {
  t.plan(1);
  t.equal(typeof endpoint.cmodule.search(123, 45678), 'string');
});