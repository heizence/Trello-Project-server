const crypto = require('crypto')
const secret = 'heizence'

const signup = function(database, email, password, username, callback) {
    console.log('signup 호출됨 : ')

    let users = database.collection('users')
    let pw = password.toString()
    let hash = crypto.createHmac('sha256', secret).update(pw).digest('hex')
    //console.log('signUp 에서 hash 확인 : ', hash)

    users.find({"email":email}).toArray(function(err, docs) {
        if (err) {
            callback(err, null)
        }

        if (docs.length > 0) {
            let msg = '이미 가입된 메일 주소입니다'
            callback(null, msg)            
        }
        else {
            users.find({"username":username}).toArray(function(err, docs) {
                if (err) {
                    callback(err, null)
                }

                if (docs.length > 0) {
                    let msg = '이미 사용중인 이름입니다'
                    callback(null, msg)
                }
                else {
                    users.insertMany([{"email":email, "password":hash, "username":username}], function(err, result) {
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
    })
}

module.exports = signup