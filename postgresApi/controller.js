module.exports = {
  home: (req, res) => {
    res.send(
      'Massive API. You are connected to schema:' + req.app.get('db'.schema)
    );
  },
  getAllTables: (req, res) => {
    const db = req.app.get('db');
    const tables = db.listTables();
    res.send(tables);
  },
  getAllSchemas: (req, res) => {
    const db = req.app.get('db');
    const schemas = db.find();
    res.send(schemas);
  },
  getUsers: (req, res) => {
    //This function gets all the users from our database users table. We start by setting db equal to
    //our db file. Then we invoke get_users, which is our SQL query for getting all users. We then send
    //that data to the client-side.
    // const db = req.app.get('db');
    const { sch, tbl } = req.params;
    // const { tbl } = req.body;

    console.log(sch, tbl);
    const sql = 'SELECT * from ' + sch + '.' + tbl;

    // req.app
    //   .get('db')
    //   .get_users({ tableName })
    //   .then(rows => {
    //     res.status(200).send(rows);
    //   });
    const db = req.app.get('db');

    db.query(sql).then(rows => {
      res.status(200).send(rows);
    });

    // db.get_users()
    //   .then(users => {
    //     res.status(200).send(users);
    //   })
    //   .catch(err => console.log(err));
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
