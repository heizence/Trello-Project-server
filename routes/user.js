const express = require('express')
const router = express.Router()
const authUser = require('../modules/authUser')


// var database = ??

router.route('/users/signin').post(function(req, res) {
    console.log('login 요청 받음 : ', req.body)

    let paramId = req.body.email
    let paramPassword = req.body.password

    if (database) {
        console.log('DB 있음')
        authUser(database, paramId, paramPassword, function(err, docs) {
            if (err) {
                throw err;
            }

            if (docs) {
                console.log(docs)
                let username = docs[0].username;

                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
                res.write('Login Success!\n')
                res.write('ID : ' + paramId + '\n') 
                res.write('Password : ' + paramPassword + '\n')
                res.write('Username : ' + username)
                res.end()
            }
            else {
                res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
                res.write('Login Failed!' + '\n')
                res.write('Check your ID and password again!' + '\n')
                res.end();
            }
        })
    }
    else {
        console.log('DB 없음')
        res.writeHead('200', {'Content-Type':'text/html;charset=utf8'})
        res.write('데이터베이스 연결 실패')
        res.write('데이터베이스에 연결하지 못했습니다')
        res.end();
    }
})

module.exports = router