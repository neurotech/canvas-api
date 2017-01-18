'use strict';

module.exports = {
  domain: process.env.CANVAS_API_DOMAIN,
  apiVersion: process.env.CANVAS_API_VERSION,
  throttle: process.env.CANVAS_API_THROTTLE,
  headers: { 'Authorization': `Bearer ${process.env.CANVAS_API_KEY}` }
};
