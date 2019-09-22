const express = require('express');

const router = express.Router();
const hash = 'bundle';

const cssPath = process.env.NODE_ENV === 'production'
  ? `/bundle/${hash}.css`
  : '/static/bundle.css';
const jsPath = process.env.NODE_ENV === 'production'
  ? `/bundle/${hash}.js`
  : '/static/bundle.js';

/* GET home page. */
router.get('*', (req, res) => {
  res.render('index', { title: 'Cloud Gallery', cssPath, jsPath });
});

module.exports = router;
