const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');
const dboper = require('./operations');

const url = 'mongodb://localhost:27017/';
const dbname = 'conFusion';

MongoClient.connect(url, (err, client) => {
    assert.equal(err, null);

    console.log('Connected successfully');

    const db = client.db(dbname);

    dboper.insertDocument(db, { name: 'vadonut', description: 'test' }, 'dishes', (result) => {
        console.log('Insert document:\n', result.ops);

        dboper.findDocuments(db, 'dishes', (docs) => {
            console.log('found documents:\n', docs);

            dboper.updateDocument(db,{ name: 'vadonut' },{ description: 'test' },'dishes',(result) => {
                console.log('updated document:\n', result.result);

                dboper.findDocuments(db, 'dishes', (docs) => {
                    console.log('found documents:\n', docs);

                    db.dropCollection('dishes', (result) => {
                        console.log('dropped collection:', result);
                        client.close();
                    });
                });
            });
        });
    });
});
