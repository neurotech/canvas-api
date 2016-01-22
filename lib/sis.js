'use strict';

var fs = require('fs');
var moment = require('moment');
var request = require('request');
var endpoints = require('./endpoints');

var sis = {};

function _idHelper (scope) {
  if (scope === 'latest' || scope === undefined) {
    return '';
  } else if (scope === 'all') {
    return '';
  } else {
    return scope;
  }
}

sis.status = function (config) {
  return new Promise(function (resolve, reject) {
    if (typeof config === 'undefined') {
      reject('No config object supplied.');
    } else {
      if (typeof config.scope === 'undefined') {
        config.scope = 'latest';
      }
    }
    request({
      url: endpoints.sisImports(config.domain || process.env.CANVAS_API_DOMAIN) + _idHelper(config.scope),
      headers: { 'Authorization': 'Bearer ' + process.env.CANVAS_API_KEY },
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

sis.upload = function (config) {
  return new Promise(function (resolve, reject) {
    if (typeof config === 'undefined' || typeof config.csv === 'undefined' || typeof config.dataset === 'undefined') {
      reject('Correctly formulated `config` object required. You need to supply a path to a CSV and the name of the dataset you wish to upload.');
    } else {
      var attachment = fs.createReadStream(config.csv);
      var diff = config.dataset + moment().format('_MMMM-YYYY').toLowerCase();
      request.post({
        headers: { 'Authorization': 'Bearer ' + process.env.CANVAS_API_KEY },
        url: endpoints.sisUpload(config.domain || process.env.CANVAS_API_DOMAIN),
        qs: {diffing_data_set_identifier: diff},
        formData: {attachment: attachment},
        json: true
      }, function (error, response, body) {
        if (!error && response.statusCode >= 200 && response.statusCode < 300) {
          body.dataset = config.dataset;
          resolve(body);
        } else {
          reject(error);
        }
      });
    }
  });
};

module.exports = sis;
