require('dotenv').config;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const massive = require('massive');
const graphqlHTTP = require('express-graphql')
const { buildSchema } = require('graphql')
const { postgraphile } = require("postgraphile");

const { API_SCHEMAS }  = require('./config')
console.log((API_SCHEMAS));


const ctrl = require('./controller');


const app = express();
app.use(cors());

app.use(bodyParser.json());


// const { API_SCHEMAS} = process.env
CONNECTION_STRING = {
  host: 'postgres-massive-api-react_db_1',
  port: 5432,
  database: 'postgres',
  user: 'postgres',
  password: 'example'
};


const postgraphileOptions = {
  subscriptions: true,
  watchPg: true,
  dynamicJson: true,
  setofFunctionsContainNulls: false,
  ignoreRBAC: false,
  ignoreIndexes: false,
  showErrorStack: "json",
  extendedErrors: ["hint", "detail", "errcode"],
  // appendPlugins: [require("@graphile-contrib/pg-simplify-inflector")],
  exportGqlSchemaPath: "schema.graphql",
  graphiql: true,
  enhanceGraphiql: true,
  allowExplain(req) {
    // TODO: customise condition!
    return true;
  },
  enableQueryBatching: true,
  legacyRelations: "omit",
  pgSettings(req) {
    /* TODO */
  },
};

// console.log(API_SCHEMAS)

// seting up postgraphql
// app.use(
//   postgraphile(
//     process.env.DATABASE_URL || "postgres://postgres:example@postgres-massive-api-react_db_1:5432/postgres",
//     API_SCHEMAS,
//     postgraphileOptions
//   )
// );

// //



console.log(CONNECTION_STRING);

massive(CONNECTION_STRING).then(dbInstance => {
  app.set('db', dbInstance);
  app.listen(4040, () => console.log('DB Connected at port 4040'));
});


// console.log(db.schema);

app.get('/', ctrl.home);
// app.get('/api/getUsers/:sch/:tbl', ctrl.getUsers);
app.get('/api/getDBName', ctrl.getDBName)
app.get('/api/getSchemas', ctrl.getSchemas)
app.get('/api/getTables', ctrl.getTables)
app.get('/api/getFields/:scm/:tbl', ctrl.getFields)
app.get('/api/getSchemaStats/:scm', ctrl.getSchemaStats)
app.get('/api/dbReload', ctrl.dbReload)
app.get('/api/dbClean', ctrl.dbClean)
app.get('/api/getTblDetails/:scm/:tbl', ctrl.getTblDetails)
app.get('/api/dbFind', ctrl.dbFind)





