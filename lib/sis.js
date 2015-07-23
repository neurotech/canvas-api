'use strict';

var fs = require('fs');
var moment = require('moment');
var request = require('request');
var endpoints = require('./endpoints');

var canvas = {};

function _authHelper (config) {
  var auth = {};

  if (typeof config.key === 'undefined') {
    if (process.env.CANVAS_API_KEY) {
      auth.key = { 'Authorization': 'Bearer ' + process.env.CANVAS_API_KEY };
    } else {
      throw new Error('Canvas API key not found!');
    }
  }
  if (typeof config.domain === 'undefined') {
    if (process.env.CANVAS_API_DOMAIN) {
      auth.domain = process.env.CANVAS_API_DOMAIN;
    } else {
      throw new Error('Canvas Domain not found!');
    }
  }
  return auth;
}

function _idHelper (scope) {
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
    }
    var credentials = _authHelper(config);
    request({
      url: endpoints.sisImports(credentials.domain) + _idHelper(config.scope),
      headers: credentials.key,
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

canvas.sisUpload = function (config) {
  return new Promise(function (resolve, reject) {
    if (typeof config === 'undefined' || typeof config.csv === 'undefined' || typeof config.dataset === 'undefined') {
      reject('Correctly formulated `config` object required. You need to supply a path to a CSV and the name of the dataset you wish to upload.');
    } else {
      var attachment = fs.createReadStream(config.csv);
      var diff = config.dataset + moment().format('_MMMM-YYYY').toLowerCase();
      var credentials = _authHelper(config);

      request.post({
        headers: credentials.key,
        url: endpoints.sisUpload(credentials.domain),
        qs: {diffing_data_set_identifier: diff},
        formData: {attachment: attachment},
        json: true
      }, function (error, response, body) {
        if (!error && response.statusCode >= 200 && response.statusCode < 300) {
          resolve(body);
        } else {
          reject(error);
        }
      });
    }
  });
};

module.exports = canvas;
