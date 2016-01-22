'use strict';

var request = require('request');
var endpoints = require('./endpoints');

var migration = {};

migration.migrate = function (config) {
  return new Promise(function (resolve, reject) {
    if (typeof config === 'undefined') {
      reject('Correctly formulated `config` object required.');
    } else {
      request.post({
        headers: { 'Authorization': 'Bearer ' + process.env.CANVAS_API_KEY },
        url: endpoints.courseMigrate(config.domain || process.env.CANVAS_API_DOMAIN, config.to_id),
        qs: {
          migration_type: 'course_copy_importer',
          settings: {
            source_course_id: config.from_id
          }
        },
        json: true
      }, function (error, response, body) {
        if (!error && response.statusCode >= 200 && response.statusCode < 300) {
          resolve(body);
        } else {
          reject(response);
        }
      });
    }
  });
};

module.exports = migration;
