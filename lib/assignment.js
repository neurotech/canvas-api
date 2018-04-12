const tiny = require('tiny-json-http');
const endpoint = require('./endpoint');
const config = require('../config');

let assignment = {};

assignment.searchbyname = function(course,name,callback){
 return tiny.get({
     url: endpoint.assignment.search(course),
     headers: config.headers,
     data: {search_term: name
    }},callback);
}
assignment.get = (course, id, callback) => {
  return tiny.get({
    url: endpoint.assignment.modify(course, id),
    headers: config.headers
  }, callback);
};

assignment.create = (course, params, callback) => {
 return tiny.post({
    url: endpoint.assignment.create(course),
    headers: config.headers,
    data: params
  }, callback);
};

assignment.edit = (course, id, params, callback) => {
 return tiny.put({
    url: endpoint.assignment.modify(course, id),
    headers: config.headers,
    data: params
  }, callback);
};

assignment.delete = (course, id, callback) => {
 return tiny.del({
    url: endpoint.assignment.modify(course, id),
    headers: config.headers
  }, callback);
};

module.exports = assignment;

