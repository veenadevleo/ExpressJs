const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, { useUnifiedTopology: true })
  .then((client) => {
    console.log('Connected successfully');

    const db = client.db(dbname);

    dboper
      .insertDocument(db, { name: 'vadonut', description: 'test' }, 'dishes')
      .then((result) => {
        console.log('Insert document:\n', result.ops);
        return dboper.findDocuments(db, 'dishes');
      })
      .then((docs) => {
        console.log('found documents:\n', docs);
        return dboper.updateDocument(db, { name: 'vadonut' }, { description: 'test' }, 'dishes');
      })
      .then((result) => {
        console.log('updated document:\n', result.result);
        return dboper.findDocuments(db, 'dishes');
      })
      .then((docs) => {
        console.log('found documents:\n', docs);
        return db.dropCollection('dishes');
      })
      .then((result) => {
        console.log('Dropped Collection:', result);
        client.close();
      })
      .catch((err) => console.log('Error:', err)); // Handle any errors in the Promise chain
  })
  .catch((err) => console.log('Error connecting to the database:', err));
