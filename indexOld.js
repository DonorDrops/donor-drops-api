const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { ATLAS, PORT } = process.env;
const port = PORT || 3002;

// Routes
// const accounts = require('./api/routes/accounts');

// Connecting to db
// mongoose.connect(
//   'mongodb://GTime:'+ process.env.ATLAS +'@farm-bridge-shard-00-00-gvo48.mongodb.net:27017,farm-bridge-shard-00-01-gvo48.mongodb.net:27017,farm-bridge-shard-00-02-gvo48.mongodb.net:27017/test?ssl=true&replicaSet=farm-bridge-shard-0&authSource=admin&retryWrites=true'
// )
// mongoose.connect(`
//   mongodb://${ATLAS.userName}:${ATLAS.password}@cluster0-shard-00-00-diacx.mongodb.net:27017,
//   cluster0-shard-00-01-diacx.mongodb.net:27017,
//   cluster0-shard-00-02-diacx.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin&retryWrites=true
// `)

// Middlewares Handling
app.use(express.static(path.join(__dirname, 'views')));
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routes Handling
app.get('/', function (req, res) {
  res.send('Hi, Donor Drops here');
});
// app.use('/api', accounts);

// Error Handling
app.use((req, res, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next( error);
})
app.use((error, req, res, next) => {
  res.status(error.status || 500);
  res.json({
    error: {
      message: error.message
    }
  });
});

// Porting
app.listen(port);
