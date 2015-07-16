var test = require('tape');
var canvas = require('../lib/canvas-api');

var auth = { 'Authorization': 'Bearer ' + process.env.CANVAS_API_KEY };
var domain = process.env.CANVAS_API_DOMAIN;

test('Canvas API - SIS Import Status - Latest', function (t) {
  t.plan(2);
  canvas.sisStatus(auth, domain)
    .then(function (res) {
      t.equal(typeof res, 'object', 'Returned the latest SIS Import object.');
      t.equal(typeof res.id, 'number', 'The ID of the latest SIS Import object is a number.');
    });
});

test('Canvas API - SIS Import Status - ID of 1', function (t) {
  t.plan(1);
  canvas.sisStatus(auth, domain, 1)
    .then(function (res) {
      t.equal(res.id, 1, 'Returned a SIS Import object with the ID of 1.');
    });
});

test('Canvas API - SIS Import Status - All', function (t) {
  t.plan(1);
  canvas.sisStatus(auth, domain, 'all')
    .then(function (res) {
      t.equal(typeof res.sis_imports, 'object', 'Returned all SIS Import objects.');
    });
});
