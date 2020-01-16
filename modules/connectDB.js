var MongoClient = require('mongodb').MongoClient;
var database

var connectDB = function() {
  let databaseUrl = 'mongodb://localhost:27017/local';
  //let database

  MongoClient.connect(databaseUrl, function(err, db) {
    if (err) {
      throw err;
    }
    console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl)

    database = db.db('local');
  })
  
}

module.exports = connectDB;