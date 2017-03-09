const tiny = require('tiny-json-http');
const endpoint = require('./endpoint');
const helpers = require('./helpers');
const config = require('../config');

let rubric = {};

rubric.list = (course, params, callback) => {
  let options = {
    url: endpoint.rubric.list(course),
    headers: config.headers,
    data: params
  };

  helpers.getAllResources(options, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      callback(null, results);
    }
  });
};

rubric.detail = (course, assignment, params, callback) => {
  let options = {
    url: endpoint.rubric.detail(course, assignment),
    headers: config.headers,
    data: params
  };

  tiny.get(options, (error, results) => {
    if (error) {
      callback(error, null);
    } else {
      let detail = {
        assignment: {
          course_id: results.body.course_id,
          assignment_id: results.body.id,
          integration_data: results.body.integration_data,
          integration_id: results.body.integration_id
        },
        rubric: results.body.rubric,
        rubric_settings: results.body.rubric_settings
      };
      callback(null, detail);
    }
  });
};

module.exports = rubric;
