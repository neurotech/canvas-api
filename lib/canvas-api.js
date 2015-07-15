'use strict';

var request = require('request');
var endpoints = require('./canvas-endpoints');

var canvas = {};

function idHelper (id) {
  if (!id || '' || id === undefined) {
    return '';
  } else if (id === 'all') {
    return '';
  } else {
    return id;
  }
}

canvas.sisStatus = function (auth, domain, id) {
  return new Promise(function (resolve, reject) {
    auth = auth || '';
    domain = domain || '';
    id = id || '';

    var options = {
      url: endpoints.sisImports(domain) + idHelper(id),
      headers: auth,
      json: true
    };

    request(options, function (error, response, body) {
      if (!error && response.statusCode >= 200 && response.statusCode < 300) {
        if (!id) {
          resolve(body.sis_imports[0]);
        } else {
          resolve(body);
        }
      } else {
        reject(error);
      }
    });
  });
};

module.exports = canvas;
