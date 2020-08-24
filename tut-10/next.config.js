const dotenv = require('dotenv');

dotenv.config();

// build-time variables
module.exports = {
  env: {
    MY_STEP: process.env.MY_STEP,
    // API_ENDPOINT: '/myapi/version/1',
  },
  serverRuntimeConfig: {
    // only available on server side
    MY_SECRET: process.env.MY_SECRET,
  },
  publicRuntimeConfig: {
    // only available on client side
    API_ENDPOINT: '/myapi/version/1',
  },
};