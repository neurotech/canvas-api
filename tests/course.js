const test = require('tape');
const course = require('../lib/course');
var nock = require('nock');
const config = require('../config');

// Dummy data used for Mocks
let source = 1;
let destination = 2;
let id = 3;
let courseid = 4;
let res;

// Mock http calls
res = nock('https://'+config.domain+'/api/'+config.apiVersion)
  .post('/courses/'+destination+'/content_migrations')
  .reply(200, { id: id });

  res = nock('https://'+config.domain+'/api/'+config.apiVersion)
  .post('/courses/'+courseid+'/discussion_topics')
  .reply(200, { id: id });

test('Course - Migration', (t) => {
  t.plan(1);
  course.migrate(source, destination, (error, results) => {
    if (error) {
      t.fail('Failed... '+error.statusCode);
    } else {
      t.equal(results.body.id,id,'Passed..successfully retrieved data');
    }
  });
});


test('Course - Announcement', (t) => {
  t.plan(1);
  let params = {};  
  course.discuss(courseid,params, (error, results) => {
    if (error) {
      t.fail('Failed... '+error.statusCode);
    } else {
      t.equal(results.body.id, id,'Passed..successfully retrieved data');
    }
  });
});
