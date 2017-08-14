const tiny = require('tiny-json-http');
const endpoint = require('./endpoint');
const config = require('../config');

let assignment = {};

assignment.get = (course, id, callback) => {
  tiny.get({
    url: endpoint.assignment.modify(course, id),
    headers: config.headers
  }, callback);
};

assignment.create = (course, params, callback) => {
  tiny.post({
    url: endpoint.assignment.create(course),
    headers: config.headers,
    data: params
  }, callback);
};

assignment.edit = (course, id, params, callback) => {
  tiny.put({
    url: endpoint.assignment.modify(course, id),
    headers: config.headers,
    data: params
  }, callback);
};

assignment.delete = (course, id, callback) => {
  tiny.del({
    url: endpoint.assignment.modify(course, id),
    headers: config.headers
  }, callback);
};

module.exports = assignment;
