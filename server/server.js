'use strict';

const fs = require('fs');
const path = require('path');
const express = require('express');
const proxy = require('proxy-middleware');
const url = require('url');


// APP CONFIGURATION
const app = express();
app.set('port', (process.env.PORT || 3000));


// STATICS
app.use('/bundle', proxy(url.parse('http://localhost:8080/bundle')));


// SERVE APP INDEX
app.get('/*', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});


// INITIALIZE APP
app.listen(app.get('port'), () => {
  console.log('Server started: http://localhost:' + app.get('port') + '/');
});
