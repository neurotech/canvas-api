# :panda_face: canvas-api

*A collection of helper methods for the [Canvas LMS](http://www.canvaslms.com/) API.*

## Installation

### Using [npm](https://www.npmjs.com/):

`npm install canvas-api --save`

### Using [Yarn](https://yarnpkg.com/):

`yarn add canvas-api`

## Configuration and Authorization

`canvas-api` requires some credentials for authenticating with your organization's Canvas instance - an API key and the domain of your Canvas instance, as well as some operational settings. You can provide these credentials by setting the following environment variables accordingly:

Environment Variable             | Example                        | Description
---------------------------------|--------------------------------|---
`CANVAS_API_VERSION`             | `v1`                           | API version
`CANVAS_API_DIFFING_DROP_STATUS` | 'completed'                    | [Parameter for Import SIS Data endpoint](https://canvas.instructure.com/doc/api/sis_imports.html#method.sis_imports_api.create)
`CANVAS_API_DOMAIN`              | `organisation.instructure.com` | Your organisation's Canvas domain
`CANVAS_API_KEY`                 | `secret`                       | Your API key
`CANVAS_API_THROTTLE`            | `1000`                         | Delay in `ms` between requests for `helpers.getAllResources()`

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


#### `course.discuss(course, params, callback)`

> Create a discussion topic in the desired course.

`course` is the ID of the Canvas course that you wish to create the discussion topic in.

`params` must be an object containing any of the parameters listed [here](https://canvas.instructure.com/doc/api/discussion_topics.html). nment[name]`. 

##### Example:

```javascript
var createParams = {
  title: ' This is the subject message title',
  message: 'This is a message'
  }
};

course.discuss(123, createParams, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
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

### Assignments

#### `assignment.get(course, id, callback)`

> Get an existing assignment by id in the desired course.

`course` is the ID of the Canvas course that you wish to get the assignment from.

`id` is the ID of the Assignment that you wish to get.

##### Example:

```javascript
assignment.create(123, 1001, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
  }
});
```

#### `assignment.create(course, params, callback)`

> Create an assignment in the desired course.

`course` is the ID of the Canvas course that you wish to create the assignment in.

`params` must be an object containing any of the parameters listed [here](https://canvas.instructure.com/doc/api/assignments.html#method.assignments_api.create). The only **required** parameter is `assignment[name]`. The object must be structured as shown in the example below:

##### Example:

```javascript
var createParams = {
  assignment: {
    name: 'Assignment Name',
    points_possible: 100
  }
};

assignment.create(123, createParams, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
  }
});
```

#### `assignment.edit(course, id, params, callback)`

> Edit an existing assignment by ID in the desired course.

`course` is the ID of the Canvas course that contains the assignment that you wish to edit.

`id` is the ID of the assignment that you wish to edit.

`params` must be an object containing any of the parameters listed [here](https://canvas.instructure.com/doc/api/assignments.html#method.assignments_api.update). The object must be structured as shown in the example below:

##### Example:

```javascript
var editParams = {
  assignment: {
    name: 'Assignment Name (Edited)',
    points_possible: 50
  }
};

assignment.edit(123, 4567, editParams, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
  }
});
```

#### `assignment.searchbyname(course, name, callback)`

> Search for an existing assignment by name in the desired course.

`course` is the ID of the Canvas course that contains the assignment that you wish to edit.

`name` is the substring of the name of the assignment that you wish to find.

##### Example:

```javascript

assignment.searchbyname(123, name, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
  }
});
```

#### `assignment.delete(course, id, callback)`

> Delete an assignment in the desired course.

`course` is the ID of the Canvas course that contains the assignment that you wish to delete.

`id` is the ID of the assignment that you wish to delete.

##### Example:

```javascript
assignment.delete(123, 4567, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
  }
});
```


### Modules

#### `cmodule.get(course, id, callback)`

> Get an existing cmodule by id in the desired course.

`course` is the ID of the Canvas course that you wish to get the cmodule from.

`id` is the ID of the cmodule that you wish to get.

##### Example:

```javascript
cmodule.create(123, 1001, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
  }
});
```

#### `cmodule.create(course, params, callback)`

> Create an cmodule in the desired course.

`course` is the ID of the Canvas course that you wish to create the cmodule in.

`params` must be an object containing any of the parameters listed [here](https://canvas.instructure.com/doc/api/modules.html).

##### Example:

```javascript
var createParams = {
  module: {
    name: 'cmodule Name'
  }
};

cmodule.create(123, createParams, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
  }
});
```

#### `cmodule.edit(course, id, params, callback)`

> Edit an existing cmodule by ID in the desired course.

`course` is the ID of the Canvas course that contains the cmodule that you wish to edit.

`id` is the ID of the cmodule that you wish to edit.

`params` must be an object containing any of the parameters listed [here](https://canvas.instructure.com/doc/api/modules.html#method.modules_api.update). The object must be structured as shown in the example below:

##### Example:

```javascript
var editParams = {
  module: {
    name: 'cmodule Name (Edited)'

  }
};

cmodule.edit(123, 4567, editParams, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
  }
});
```

#### `cmodule.searchbyname(course, name, callback)`

> Search for an existing cmodule by name in the desired course.

`course` is the ID of the Canvas course that contains the cmodule that you wish to edit.

`name` is the substring of the name of the cmodule that you wish to find.

##### Example:

```javascript

cmodule.searchbyname(123, name, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
  }
});
```

#### `cmodule.delete(course, id, callback)`

> Delete an cmodule in the desired course.

`course` is the ID of the Canvas course that contains the cmodule that you wish to delete.

`id` is the ID of the cmodule that you wish to delete.

##### Example:

```javascript
cmodule.delete(123, 4567, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
  }
});
```


### Rubrics

#### `rubric.list(course, params, (callback)`

> List rubrics used in the desired course.

##### Example:

```javascript
var params = {
  data: {
    per_page: 100
  }
};

rubric.list(123, params, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
  }
});
```

#### `rubric.detail(course, assignment, params, (callback)`

> List rubric details for a desired assignment in a course.

##### Example:

```javascript
var params = {
  data: {
    per_page: 100
  }
};

rubric.detail(123, 4567, params, (error, results) => {
  if (error) {
    // Error!
  } else {
    // [ results ... ]
  }
});
```

## Tests

The `canvas-api` test suite requires some environment variables to be set:

Environment Variable                 | Description | Example
-------------------------------------|-------------|--------
CANVAS_API_TEST_MIGRATION_SRC_ID     | `course_id` of the 'source' course to test Course Migration | `1`
CANVAS_API_TEST_MIGRATION_DEST_ID    | `course_id` of the 'destination' course to test Course Migration | `110`
CANVAS_API_TEST_COURSE_ID            | `course_id` of the course to use for creating, editing, deleting assignments | `123`
CANVAS_API_TEST_RUBRIC_COURSE_ID     | `course_id` of the course to use for getting Rubric detail | `123`
CANVAS_API_TEST_RUBRIC_ASSIGNMENT_ID | `assignment_id` of the assignment to use for getting Rubric detail | `4567`

The suite can be run by executing the `test` script contained in `package.json`:

### Using [npm](https://www.npmjs.com/):

`npm run test`

### Using [Yarn](https://yarnpkg.com/):

`yarn run test`
