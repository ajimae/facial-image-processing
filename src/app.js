// third-party modules
require('@tensorflow/tfjs-node');
const cors = require('cors');
const { config } = require('dotenv');
const express = require('express');

// local modules
const routes = require('./routes');

class App {
  constructor() {
    this.app = express()
  }

  config() {
    config();

    this.app.use(cors())
    this.app.use(express.json())
    this.app.set('port', process.env.APP_PORT || 3000);

    // support application/x-www-form-urlencoded post data
    this.app.use(express.urlencoded({ extended: true }));

    this.app.use(function(_, res, next) {
      res.header("Access-Control-Allow-Origin", "*");
      res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      next();
    });

    // home route
    this.app.get('/', (_, res) => {
      return res.status(200).json({
        success: true,
        message: 'welcome to softmode image processing api'
      });
    });

    // routes
    this.app.use('/api/v1', routes);

    // 404 - fallback route
    this.app.use('*', (_, res) => {
      return res.status(404).json({
        success: false,
        message: 'Oops, page not found',
      });
    });

    return this.app;
  }
}

module.exports = App;
