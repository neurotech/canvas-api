'use strict';

var request = require('request');
var endpoints = require('./canvas-endpoints');

var canvas = {};

function idHelper (scope) {
  if (scope === 'latest' || scope === undefined) {
    return '';
  } else if (scope === 'all') {
    return '';
  } else {
    return scope;
  }
}

canvas.sisStatus = function (config) {
  return new Promise(function (resolve, reject) {
    if (typeof config === 'undefined') {
      reject('No config object supplied.');
    } else {
      if (typeof config.scope === 'undefined') {
        config.scope = 'latest';
      }
      if (typeof config.key === 'undefined') {
        if (process.env.CANVAS_API_KEY) {
          config.key = { 'Authorization': 'Bearer ' + process.env.CANVAS_API_KEY };
        } else {
          reject('Canvas API key not found!');
        }
      }
      if (typeof config.domain === 'undefined') {
        if (process.env.CANVAS_API_DOMAIN) {
          config.domain = process.env.CANVAS_API_DOMAIN;
        } else {
          reject('Canvas Domain not found!');
        }
      }
    }

    request({
      url: endpoints.sisImports(config.domain) + idHelper(config.scope),
      headers: config.key,
      json: true
    }, function (error, response, body) {
      if (!error && response.statusCode >= 200 && response.statusCode < 300) {
        if (config.scope === 'latest') {
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
