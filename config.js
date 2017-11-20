module.exports = {
  apiVersion: process.env.CANVAS_API_VERSION,
  diffing_drop_status: process.CANVAS_API_DIFFING_DROP_STATUS,
  domain: process.env.CANVAS_API_DOMAIN,
  headers: { 'Authorization': `Bearer ${process.env.CANVAS_API_KEY}` },
  throttle: process.env.CANVAS_API_THROTTLE
};
