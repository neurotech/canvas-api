var test = require('tape');
var canvas = require('../lib/sis');

test('Canvas API - SIS Import Status - No arguments', function (t) {
  t.plan(1);
  canvas.sisStatus()
    .then(function (res) {
      t.equal(res, null, 'No response - there must have been an error.');
    }, function (err) {
      t.ok(err, 'Returned error: ' + '`' + err + '`');
    });
});

test('Canvas API - SIS Import Status - \'latest\'', function (t) {
  t.plan(2);
  canvas.sisStatus({
    scope: 'latest'
  })
    .then(function (res) {
      t.equal(typeof res, 'object', 'Returned the latest SIS Import object.');
      t.equal(typeof res.id, 'number', 'The ID of the latest SIS Import object is a number.');
    }, function (err) {
      t.equal(err, null);
    });
});

test('Canvas API - SIS Import Status - ID of 1', function (t) {
  t.plan(1);
  canvas.sisStatus({
    scope: 1
  })
    .then(function (res) {
      t.equal(res.id, 1, 'Returned a SIS Import object with the ID of: ' + res.id);
    }, function (err) {
      t.equal(err, null);
    });
});

test('Canvas API - SIS Import Status - All', function (t) {
  t.plan(1);
  canvas.sisStatus({
    scope: 'all'
  })
    .then(function (res) {
      t.equal(typeof res.sis_imports, 'object', 'Returned all SIS Import objects.');
    }, function (err) {
      t.equal(err, null);
    });
});
