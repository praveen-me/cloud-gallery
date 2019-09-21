const express = require('express');

const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');
const expressStaticGzip = require('express-static-gzip');

require('dotenv').config();

const port = 3001 || process.env.PORT;

// Connecting to mongoDB
mongoose.connect(
  process.env.MONGODB_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  err => {
    if (err) {
      console.log(`Error: ${e}`);
    } else {
      console.log('Connected to Atlas Database');
    }
  }
);

app.use(bodyParser.json({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

// Middle for static assets
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'dist')));

app.use(
  '/dist/bundle',
  expressStaticGzip(path.join(__dirname, 'dist/bundle'), {
    enableBrotli: true,
    orderPreference: ['br', 'gz'],
    setHeaders(res, path) {
      res.setHeader('Cache-Control', 'public, max-age=31536000');
    },
  })
);

app.set('views', path.join(__dirname, './server/views'));
app.set('view engine', 'ejs');

if (process.env.NODE_ENV === 'development') {
  const webpack = require('webpack');
  const webpackConfig = require('./webpack.config');
  const compiler = webpack(webpackConfig);

  app.use(
    require('webpack-dev-middleware')(compiler, {
      noInfo: true,
      publicPath: webpackConfig.output.publicPath,
    })
  );

  app.use(require('webpack-hot-middleware')(compiler));
}

app.use('/users', require('./server/routes/users'));
app.use('/image', require('./server/routes/image'));
app.use(require('./server/routes/index'));

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});
