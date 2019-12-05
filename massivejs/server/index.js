require('dotenv').config;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');

const ctrl = require('./controller');

const app = express();
app.use(cors());

app.use(bodyParser.json());

//const { CONNECTION_STRING } = process.env
CONNECTION_STRING = {
  host: '127.0.0.1',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'example'
};

console.log(CONNECTION_STRING);

massive(CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance);
  app.listen(4040, '0.0.0.0', () => console.log('DB Connected at port 4040'));
});

// console.log(db.schema);

app.get('/', ctrl.home);
app.get('/api/alltables', ctrl.getAllTables);
app.get('/api/allschemas', ctrl.getAllSchemas);
app.get('/api/getUsers/:sch/:tbl', ctrl.getUsers);
