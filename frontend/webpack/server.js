
const express = require('express');
const history = require('connect-history-api-fallback');
const proxy = require('http-proxy-middleware');

const port = process.env.PORT || 3000;
const backendUrl = process.env.BACKEND_URL || 'http://localhost:4000';

try {
  const app = express();
  app.use('/graphql', proxy({target: backendUrl, changeOrigin: true}));
  app.use(history());
  app.use(express.static('./build'))
  app.listen(port, '0.0.0.0', err => {
    if (err) {
      console.error(err);
    }
    console.log(`Server listening to port ${port}`);
  });
} catch (e) {
  console.error(e);
}


