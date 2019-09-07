#!/usr/bin/env node

'use strict';

const express = require('express');
const yargs = require('yargs');
const fs = require('fs');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./api/models/todoListModel');

const def_port = 3000;

const args = yargs
      .config()
      .option('port', {
          describe: 'TCP Port used by this Interior controls server',
          type: 'number'
      })
      .argv;

var port = args.port || process.env.PORT || def_port;

var app = express();

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/Tododb');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var routes = require('./api/routes/todoListRoutes'); // importing route
routes(app);

app.listen(port);

console.log('todo list RESTful API server started on: ' + port);
