const crypto = require('crypto')
const secret = 'heizence'

const authUser = function(database, email, password, callback) {
    console.log('authUser 호출됨.')
  
    let users = database.collection('users')
    let pw = password.toString()
    let hash = crypto.createHmac('sha256', secret).update(pw).digest('hex')
    console.log('authUser 에서 hash 확인 : ', hash)

    users.find({"email" : email, "password" : hash}).toArray(function(err, docs) {
      if (err) {
        callback(err, null)
      }
  
      if (docs.length > 0) {
        console.log('아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음. ', email, password);
        callback(null, docs)
      }
      else {
        console.log('일치하는 사용자를 찾지 못함.')
        callback(null, null)
      }
    })
  }

  module.exports = authUser;