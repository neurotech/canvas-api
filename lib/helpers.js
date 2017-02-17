const tiny = require('tiny-json-http');
const parse = require('parse-link-header');
const config = require('../config');

let helpers = {};

helpers.getAllResources = (options, callback) => {
  var collection = [];
  options.headers = config.headers;
  const _get = (options) => {
    setTimeout(() => {
      tiny.get(options, (error, result) => {
        var pages = {};
        if (error) {
          error.url = options.url;
          callback(error, null);
        }
        if (!result) {
          callback(null, collection);
        } else {
          if (result.body instanceof Array) {
            result.body.forEach((element) => {
              collection.push(element);
            });
          } else {
            collection.push(result.body);
          }

          if (result.headers.link) {
            pages = parse(result.headers.link);
          }

          if (pages.next) {
            options.url = pages.next.url;
            options.data = null;
            _get(options);
          } else {
            callback(null, collection);
          }
        }
      });
    }, config.throttle);
  };
  _get(options);
};

module.exports = helpers;
