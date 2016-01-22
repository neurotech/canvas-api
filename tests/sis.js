var test = require('tape');
var path = require('path');
var sis = require('../lib/sis');

test('Canvas API - SIS Import Status - No arguments', function (t) {
  t.plan(1);
  sis.status()
    .then(function (res) {
      t.equal(res, null, 'No response - there must have been an error.');
    }, function (err) {
      t.ok(err, 'Returned error: ' + '`' + err + '`');
    });
});

test('Canvas API - SIS Import Status - \'latest\'', function (t) {
  t.plan(2);
  sis.status({
    domain: process.env.CANVAS_API_DOMAIN,
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
  sis.status({
    domain: process.env.CANVAS_API_DOMAIN,
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
  sis.status({
    domain: process.env.CANVAS_API_DOMAIN,
    scope: 'all'
  })
    .then(function (res) {
      t.equal(typeof res.sis_imports, 'object', 'Returned all SIS Import objects.');
    }, function (err) {
      t.equal(err, null);
    });
});

/*
  SIS Upload
*/

test('Canvas API - SIS Upload - No arguments', function (t) {
  t.plan(1);
  sis.upload()
    .then(function (res) {
      t.equal(res, null, 'No `success` response received.');
    }, function (err) {
      t.ok(err, 'Returned error: ' + '`' + err + '`');
    });
});

test('Canvas API - SIS Upload - Sample CSV and no dataset', function (t) {
  t.plan(1);
  sis.upload({
    csv: './csv/sample.csv'
  })
    .then(function (res) {
      t.equal(res, null, 'No `success` response received.');
    }, function (err) {
      t.ok(err, 'Returned error: ' + '`' + err + '`');
    });
});

test('Canvas API - SIS Upload - No CSV and sample dataset', function (t) {
  t.plan(1);
  sis.upload({
    dataset: 'terms'
  })
    .then(function (res) {
      t.equal(res, null, 'No `success` response received.');
    }, function (err) {
      t.ok(err, 'Returned error: ' + '`' + err + '`');
    });
});

test('Canvas API - SIS Upload - Sample CSV and sample dataset', function (t) {
  // sample.csv only contains header rows so no data will change in your Canvas instance when running tests.
  // This will generate false positive error in your Canvas instance, in Account > SIS Import > Last Batch:
  // `There was an error importing your SIS data. No records were imported.`
  t.plan(1);
  sis.upload({
    csv: path.normalize(__dirname + '/csv/sample.csv'),
    dataset: 'terms'
  })
    .then(function (res) {
      t.notEqual(res.dataset, null, 'CSV uploaded and SIS Import started.');
    }, function (err) {
      t.equal(err, null);
    });
});
