const tiny = require('tiny-json-http');
const endpoint = require('./endpoint');
const config = require('../config');

let course = {};

course.migrate = (source, destination, callback) => {
  tiny.post({
    url: endpoint.course.migrate(destination),
    headers: config.headers,
    data: {
      migration_type: 'course_copy_importer',
      settings: { source_course_id: source },
      date_shift_options: { remove_dates: true }
    }
  }, callback);
};

course.discuss = (course,params,callback) => {
  return tiny.post({
    url: endpoint.course.discuss(course),
    headers: config.headers,
    data: params
  }, callback);
};
module.exports = course;
