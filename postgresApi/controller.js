var _ = require("lodash");

module.exports = {
  home: (req, res) => {
    res.send(
      'Massive API. Connected'
    );
  },
  getDBName: (req,res) =>{
    const sql = 'SELECT current_database();'
    const dbName = req.app.get('db').query(sql).then(rows=>{ res.status(200).send(rows)})
  },
  getSchemas: (req,res) => {
      const sql = `
        select nspname 
        from pg_catalog.pg_namespace
        where nspname not in ('postgraphile_watch', 'information_schema')
        and   nspname not like 'pg_%';`
      const dbSchemas = req.app.get('db').query(sql).then(rows=>{ res.status(200).send(rows)})
  },
  getTables: (req,res) => {
    const db = req.app.get('db');
    const tables = db.listTables();
    const data = tables.map((row,id)=>({id:id, table:row}))
    console.log(data)
    res.send(data);
  },
  getFields: (req,res) => {
    const { scm, tbl } = req.params
    console.log(scm, tbl);
    
    const sql = `SELECT *
      FROM information_schema.columns
      WHERE table_schema = '${scm}'
      AND table_name   = '${tbl}'
      ;`
    console.log(sql)  
    const fields = req.app.get('db').query(sql).then(rows=>{ res.status(200).send(rows)})
  },
  getSchemaStats: (req,res) => {
    const { scm } = req.params
    const sql = `SELECT * FROM pg_catalog.pg_stat_user_tables where schemaname = '${scm}';`
    const stats = req.app.get('db').query(sql).then(rows=>{ res.status(200).send(rows)})
  },
  dbReload: (req,res) => {
    const dbReload = req.app.get('db').reload().then(()=>{ res.status(200).send('db refreshed')})
  },
  dbClean: (req,res)=> {
    const cleanDB = req.app.get('db').clean();
    res.send('done')
  },
  attach: (req,res)=> {
    const { scm } = req.params
    console.log('scm',scm)
    const scmAttach = req.app.get('db').attach([{scm}])//.then((results)=>{ res.status(200).send(`${results} added`)})
    console.log(scmAttach)
    res.send('added')
  },
  getTblDetails: async (req, res) => {
    const { scm, tbl } = req.params;
    const sql = 'SELECT * from ' + scm + '.' + tbl;
    const db = req.app.get('db');

    await db.query(sql).then(rows => {
      console.log(rows)
      res.status(200).send(rows);
    });
  },
  dbFind: async (req,res) => {
      const { table, schema } = req.params
      console.log(table, schema)
      res.status(200).send('got it')
  },
  postUser: (req, res) => {
    //This function takes a name(string) from the clients request, and creates a new user with it, by
    //running the post_user SQL query. We are passing the name without curly brackets, which is what
    //you'll do if you're SQL query is referencing parameters as $1, $2, and so on. If your SQL query
    //is referencing parameters as ${name} or something similar, look at the update and delete handler
    //functions below to see how to pass in those arguments.
    const { name } = req.body;
    const db = req.app.get('db');
    db.post_user(name)
      .then(users => {
        res.status(200).send(users);
      })
      .catch(err => res.status(500).send(err));
  },
  updateUser: (req, res) => {
    //This function takes the id from the req.params object, and the name from the body object sent from
    //the clients request. I then pass the arguments inside of curly brackets, since the SQL query is
    //referencing them as ${name} and ${id}. The names in the SQL query MUST MATCH what is passed into
    //the SQL query.
    const { id } = req.params;
    const { name } = req.body;

    req.app
      .get('db')
      .update_user({ name, id })
      .then(users => {
        res.status(200).send(users);
      })
      .catch(err => res.status(500).send(err));
  },
  deleteUser: (req, res) => {
    //This function takes the id from the req.params object, and passes it into the delete_user SQL file
    //to remove the user from the database.
    const { id } = req.params;
    req.app
      .get('db')
      .delete_user({ id })
      .then(users => {
        res.sendStatus(200);
      })
      .catch(err => res.status(500).send(err));
  }
};
