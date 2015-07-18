# canvas-api

[![Build Status](https://travis-ci.org/neurotech/canvas-api.svg?branch=master)](https://travis-ci.org/neurotech/canvas-api)

*A Promise-based collection of helper methods for the [Canvas LMS](http://www.canvaslms.com/) API.*

## Installation

`npm install canvas-api --save`

## Configuration and Authorization

`canvas-api` expects some credentials for authenticating with your organization's Canvas instance. You can provide these credentials via the following environment variables (this is the preferred approach with regards to the security of your API key).

```
CANVAS_API_KEY=secret
CANVAS_API_DOMAIN=organization.instructure.com
```

### In-application Variables

*Please note that this is not best practice with regards to the security of your API key.*

All of the methods in `canvas-api` accept a `config` object that enable you to specify an API key/domain that differs from what you have stored in your environment variables.

``` javascript
var canvas = require('canvas-api');

var config = {
  key: { 'Authorization': 'Bearer ' + 'SECRET' },
  domain: 'organization.test.instructure.com'
};

// Return the latest SIS Import object using the above credentials.
canvas.sisStatus(config)
  .then(function (res) {
    console.log(res);
  }, function (err) {
    console.error(err);
  });
```

## Usage/API

``` javascript
var canvas = require('canvas-api');
```

### sisStatus([config])

Return [SIS Import](https://canvas.instructure.com/doc/api/sis_imports.html#SisImport) status information.

Available options for `config` are:

#### config.scope

 - If `latest` or if no `scope` is supplied, the latest SIS Import object will be returned.
 - If a SIS Import `id` is supplied, the SIS Import object with that id will be returned.
 - If `'all'` is supplied, all SIS Import objects will be returned.

#### config.key

(Optional) Overrides the `CANVAS_API_KEY` environment variable.

#### config.domain

(Optional) Overrides the `CANVAS_API_DOMAIN` environment variable.

### Example

``` javascript
canvas.sisStatus({scope: 5})
  .then(function (res) {
    // Log the SIS Import object with the ID of 5 to the console.
    console.log(res);
  }, function (err) {
    console.error(err);
  });
```

## Tests

Tests can be run with `npm test` in the module's directory.

If you haven't set your environment variables yet, you can run the tests by supplying them via the command line:

`CANVAS_API_KEY=secret CANVAS_API_DOMAIN=organization.instructure.com npm test`
