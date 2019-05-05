const express = require('express');
const router = express.Router();
const mongoose = require('mongoose')

router.get('/inicio', (req, res) => {
  res.render('index.hbs');
});

router.get('/about', (req, res) => {
  res.render('about');
});

module.exports = router;