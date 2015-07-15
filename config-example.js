var config = {};

var domain = 'organization.instructure.com';
var token = 'SECRET';

config.auth = { 'Authorization': 'Bearer ' + token };
config.domain = domain;

module.exports = config;
