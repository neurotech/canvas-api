const tiny = require('tiny-json-http');
const endpoint = require('./endpoint');
const config = require('../config');

let cmodule = {};

cmodule.searchbyname = function(course,name,callback){
 return tiny.get({
     url: endpoint.cmodule.search(course),
     headers: config.headers,
     data: {search_term: name
    }},callback);
}
cmodule.get = (course, id, callback) => {
  return tiny.get({
    url: endpoint.cmodule.modify(course, id),
    headers: config.headers
  }, callback);
};

cmodule.create = (course, params, callback) => {
 return tiny.post({
    url: endpoint.cmodule.create(course),
    headers: config.headers,
    data: params
  }, callback);
};

cmodule.edit = (course, id, params, callback) => {
 return tiny.put({
    url: endpoint.cmodule.modify(course, id),
    headers: config.headers,
    data: params
  }, callback);
};

cmodule.delete = (course, id, callback) => {
 return tiny.del({
    url: endpoint.cmodule.modify(course, id),
    headers: config.headers
  }, callback);
};

module.exports = cmodule;

