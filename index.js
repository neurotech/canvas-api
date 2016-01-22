'use strict';

var sis = require('./lib/sis');
var migration = require('./lib/migration');

var canvas = {sis, migration};

module.exports = canvas;
