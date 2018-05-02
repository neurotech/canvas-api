const helpers = require('./lib/helpers');
const endpoint = require('./lib/endpoint');
const sis = require('./lib/sis');
const course = require('./lib/course');
const assignment = require('./lib/assignment');
const cmodule = require('./lib/module');

let canvas = { helpers, endpoint, sis, course, assignment, cmodule };

module.exports = canvas;

