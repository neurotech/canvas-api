# :panda_face: canvas-api

[![Build Status](https://travis-ci.org/neurotech/canvas-api.svg?branch=master)](https://travis-ci.org/neurotech/canvas-api)

*A collection of helper methods for the [Canvas LMS](http://www.canvaslms.com/) API.*

## Installation

### Using [npm](https://www.npmjs.com/):

`npm install canvas-api --save`

### Using [Yarn](https://yarnpkg.com/):

`yarn add canvas-api`

## Configuration and Authorization

`canvas-api` requires some credentials for authenticating with your organization's Canvas instance - an API key and the domain of your Canvas instance, as well as some operational settings. You can provide these credentials by setting the following environment variables accordingly:

Environment Variable  | Example  | Description
----------------------|----------|------------
`CANVAS_API_KEY`      | `secret` | Your API key
`CANVAS_API_DOMAIN`   | `organisation.instructure.com` | Your organisation's Canvas domain
`CANVAS_API_VERSION`  | `v1` | API version
`CANVAS_API_THROTTLE` | `1000` | Delay in `ms` between requests for `helpers.getAllResources()`

## Usage

`require` the module in your node.js application and invoke methods accordingly.

```javascript
const canvas = require('canvas-api');
```

## Methods

### Common Helpers

#### `helpers.getAllResources(options, callback)`

> Iterates over the pagination URLs returned by the Canvas API, captures the results from each iteration, and then returns an array of results once complete.

Values for `options` are:

##### options.url

**(Required)** API endpoint URL

##### options.data

**(Optional)** Query string variables

##### Example:

```javascript
let options = {
  url: `https://organisation.instructure.com/api/v1/accounts/1/courses`,
  data: {
    per_page: 100
  }
};

canvas.helpers.getAllResources(options, (error, results) => {
  if (error) {
    console.error(error);
    // Error!
  } else {
    console.log(results);
    // [ results ... ]
  }
});
```

### Courses

#### `course.migrate(source, destination, callback)`

> Migrates the content of one course to another using the `course_copy_importer` migration type.

##### source

**(Required)** `course_id` of the course that will be copied **from**.

##### destination

**(Required)** `course_id` of the course that will be copied **to**.

##### Example:

```javascript
canvas.course.migrate(1, 110, (error, results) => {
  if (error) {
    console.error(error);
    // Error!
  } else {
    console.log(results.body);
    // {
    //   id: 401,
    //   ...
    // }
  }
});
```

### SIS Imports

#### `sis.upload(options, callback)`

> POSTs a CSV file to the SIS Import endpoint that is formatted to match Instructure's [SIS CSV Format](https://canvas.instructure.com/doc/api/file.sis_csv.html). Upon success, a [SIS Import](https://canvas.instructure.com/doc/api/sis_imports.html#SisImport) Object is returned.

`options` should be an object containing the following information:

Key       | Required | Description                    | Example
----------|----------|--------------------------------|--------
`csv`     | yes      | Path to CSV                    | `'./path/to/file.csv'`
`dataset` | yes      | Dataset that is being imported | `'courses'`

##### Example:

```javascript
canvas.sis.upload({
  csv: './csv/courses.csv',
  dataset: 'courses'
}, (error, results) => {
  if (error) {
    console.error(error);
    // Error!
  } else {
    console.log(results);
    // [ results ... ]
  }
});
```

#### `sis.status(scope, callback)`

> Return [SIS Import](https://canvas.instructure.com/doc/api/sis_imports.html#SisImport) status information.

`scope` can either be:

 - `'all'` - returns the latest `10` SIS Import objects.
 - `Number` - returns the SIS Import with the ID corresponding to the supplied `Number`.

If `scope` is *not* supplied, the latest `10` SIS Import objects are returned.

##### Example:

```javascript
canvas.sis.status(10, (error, results) => {
  if (error) {
    console.error(error);
    // Error!
  } else {
    console.log(results);
    // [ results ... ]
  }
});
```
