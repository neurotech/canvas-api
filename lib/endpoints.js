var endpoints = {};

endpoints.sisImports = function (domain, account) {
  if (typeof account === 'undefined') {
    account = 'self';
  }
  return 'https://' + domain + '/api/v1/accounts/' + account + '/sis_imports/';
};

endpoints.sisUpload = function (domain, account) {
  if (typeof account === 'undefined') {
    account = 'self';
  }
  return 'https://' + domain + '/api/v1/accounts/' + account + '/sis_imports.json?import_type=instructure_csv';
};

module.exports = endpoints;
