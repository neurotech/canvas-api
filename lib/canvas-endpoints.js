var endpoints = {};

endpoints.sisImports = function (domain) {
  return 'https://' + domain + '/api/v1/accounts/self/sis_imports/';
};

endpoints.sisUpload = function (domain) {
  return 'https://' + domain + '/api/v1/accounts/self/sis_imports.json?import_type=instructure_csv';
};

module.exports = endpoints;
