// Try to load default .env variables. Note: These settings are not overwritten 
const dotenv = require('dotenv').config();


// Test if runtime env, or .env file variables have been assigned. If not, exit
if( process.env.CANVAS_API_VERSION === undefined || process.env.CANVAS_API_KEY === undefined  || process.env.CANVAS_API_KEY === undefined ){
  console.log('Missing Version, API Key or Domain  in .env file or runtime environment variables');
  process.exit();
  
  }


module.exports = {
  apiVersion: process.env.CANVAS_API_VERSION,
  diffing_drop_status: process.CANVAS_API_DIFFING_DROP_STATUS,
  domain: process.env.CANVAS_API_DOMAIN,
  headers: { 'Authorization': `Bearer ${process.env.CANVAS_API_KEY}` },
  throttle: process.env.CANVAS_API_THROTTLE
};
