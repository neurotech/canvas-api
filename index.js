const helpers = require('./lib/helpers');
const sis = require('./lib/sis');
const course = require('./lib/course');
const endpoint = require('./lib/endpoint');

let canvas = { helpers, sis, course, endpoint };

module.exports = canvas;
