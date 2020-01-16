// const signup = function(database, id, password, username, callback) {
//     console.log('signup 호출됨 : ')

//     let users = database.collection('users')

//     users.find({"id":id, "username":username}).toArray(function(err, docs) {
//         console.log('조회된 사용자 : ', docs)
//         if (err) {
//             callback(err, null)
//         }

//         if (docs.length > 0) {
//             console.log('이미 가입된 사용자입니다.')
//             if (docs[0].id === id) {
//                 let msg = '이미 가입된 메일 주소입니다'
//                 console.log(msg)
//                 callback(null, msg)
//             }
//             else if (docs[0].username === username) {
//                 let msg = '이미 사용 중인 사용자 이름입니다'
//                 console.log(msg)
//                 callback(null, msg)
//             }
//         }
//         else {
//             users.insertMany([{"id":id, "password":password, "username":username}], function(err, result) {
//                 if (err) {
//                     callback(err, null);
//                     return;
//                 }
        
//                 if (result.insertedCount > 0) {
//                     console.log('사용자 추가됨 : ' + result.insertedCount);
//                 }
//                 else {
//                     console.log('추가된 레코드가 없음.')
//                 }
        
//                 callback(null, result)
//             })
//         }
//     })
// }

const signup = function(database, id, password, username, callback) {
    console.log('signup 호출됨 : ')

    let users = database.collection('users')

    users.find({"id":id, "username":username}).toArray(function(err, docs) {
        console.log('조회된 사용자 : ', docs)
        if (err) {
            callback(err, null)
        }

        if (docs.length > 0) {
            console.log('이미 가입된 사용자입니다.')
            if (docs[0].id === id) {
                let msg = '이미 가입된 메일 주소입니다'
                console.log(msg)
                callback(null, msg)
            }
            else if (docs[0].username === username) {
                let msg = '이미 사용 중인 사용자 이름입니다'
                console.log(msg)
                callback(null, msg)
            }
        }
        else {
            users.insertMany([{"id":id, "password":password, "username":username}], function(err, result) {
                if (err) {
                    callback(err, null);
                    return;
                }
        
                if (result.insertedCount > 0) {
                    console.log('사용자 추가됨 : ' + result.insertedCount);
                }
                else {
                    console.log('추가된 레코드가 없음.')
                }
        
                callback(null, result)
            })
        }
    })
}

module.exports = signup