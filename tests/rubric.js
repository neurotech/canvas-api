const test = require('tape');
const rubric = require('../lib/rubric');
var nock = require('nock');
const config = require('../config');

// Dummy data used for Mocks
let source = 1;
let destination = 2;
let id = 3;
let courseid = 4;
let assignmentid = 5;
let nameresponse = 'Canvas API - Test Suite Assignment';
let res;

let params = {
  data: {
    per_page: 100
  }
};
// Mock http calls

res = nock('https://'+config.domain+'/api/'+config.apiVersion)
  .get('/courses/'+courseid+'/rubrics')
  .query(true)
  .reply(200, { id: id });


  res = nock('https://'+config.domain+'/api/'+config.apiVersion)
  .get('/courses/'+courseid+'/assignments/'+assignmentid)
  .query(true)
  .reply(200, { rubric_settings: {
    id: id}}
  );


/*

  rubric: {
    list: (course) => {
      return `${_baseUrl()}/courses/${course}/rubrics`;
    },
    detail: (course, assignment) => {
      return `${_baseUrl()}/courses/${course}/assignments/${assignment}`;
    }

    */



test('Rubric - List', (t) => {
  t.plan(1);
  rubric.list(courseid, params, (error, results) => {
    if (error) {
      t.fail(error);
    } else {
      console.log(`${results.length} Rubrics returned.`);
      t.ok(typeof results[0].id, 'number');
    }
  });
});

test('Rubric - Detail', (t) => {
  t.plan(1);
  rubric.detail(courseid, assignmentid, params, (error, results) => {
    if (error) {
      t.fail(error);
    } else {
      t.ok(typeof results.rubric_settings.id, 'number');
    }
  });
});
