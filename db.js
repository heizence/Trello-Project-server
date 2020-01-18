//DB 생성 및 연결 함수

const MongoClient = require('mongodb').MongoClient;
let databaseUrl = 'mongodb://localhost:27017/local';

/*
var myPromise = function() {
    console.log('promise 첫 실행')
    return new Promise((resolve, reject) => {
        MongoClient.connect(databaseUrl, function(err, db) {
            if (err) {
                reject(err);
            }
            console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl)
        
            if (db) {
                resolve(db.db('local'))
            }        
        })
    })
}

myPromise().then(database => {
    console.log('promise 두 번째 실행. db 넘겨주기 : ', database)
    module.exports = database
}).catch(err => {
    throw err
})

MongoClient.connect(databaseUrl, function(err, db) {
    if (err) {
        throw err;
    }
    console.log('데이터베이스에 연결되었습니다. : ' + databaseUrl)

    database = db.db('local');

})

*/