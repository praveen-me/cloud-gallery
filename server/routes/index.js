const express = require('express');

const router = express.Router();
const hash = 'bundle';

/* GET home page. */
router.get('*', (_, res) => {
  const cssPath = process.env.NODE_ENV === 'production'
    ? `bundle/${hash}.css`
    : 'static/bundle.css';
  const jsPath = process.env.NODE_ENV === 'production'
    ? `bundle/${hash}.js`
    : 'static/bundle.js';

  res.render('index', { title: 'Express', cssPath, jsPath });
});

module.exports = router;
