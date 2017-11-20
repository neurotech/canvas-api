const fs = require('fs');
const tiny = require('tiny-json-http');
const FormData = require('form-data');
const format = require('date-fns/format');
const endpoint = require('./endpoint');
const config = require('../config');

let sis = {};

sis.status = (scope, callback) => {
  if (scope === 'all') { scope = ''; }
  tiny.get({
    url: `${endpoint.sis.imports()}${scope}`,
    headers: config.headers
  }, callback);
};

sis.upload = (options, callback) => {
  var form = new FormData();
  var contents = {
    method: 'POST',
    protocol: 'https:',
    host: `${config.domain}`,
    path: `${endpoint.sis.upload()}&diffing_drop_status=${config.diffing_drop_status || 'completed'}&diffing_data_set_identifier=${options.dataset}${format(new Date(), '_MMMM-YYYY').toLowerCase()}`,
    headers: config.headers
  };
  form.append('attachment', fs.createReadStream(options.csv));
  form.submit(contents, (err, res) => {
    var body = [];
    if (err) { return callback(err, null); }
    res.on('data', (data) => {
      body.push(data);
    });
    res.on('end', () => {
      var error = null;
      var result = null;
      try {
        result = JSON.parse(Buffer.concat(body).toString());
      } catch (e) {
        error = e;
      }
      callback(error, result);
    });
  });
};

module.exports = sis;
