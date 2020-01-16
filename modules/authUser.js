const authUser = function(database, id, password, callback) {
    console.log('authUser 호출됨.')
  
    let users = database.collection('users')
  
    users.find({"id" : id, "password" : password}).toArray(function(err, docs) {
      if (err) {
        callback(err, null)
      }
  
      if (docs.length > 0) {
        console.log('아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음. ', id, password);
        callback(null, docs)
      }
      else {
        console.log('일치하는 사용자를 찾지 못함.')
        callback(null, null)
      }
    })
  }

  module.exports = authUser;