const express = require('express')
const router = express.Router()

router.route('/users/signout').post(function(req, res) {
    let sess = req.session
  
    if (sess){ 
      req.session.destroy(err => {
          if (err) {
              console.log(err);
              res.status(404).send('error!')
          } else {
              console.log('세션 삭제 확인 : ', req.session)
              console.log('로그아웃 됨\n')              
              res.status(200).send('로그아웃 되었습니다.')
          }
      })
    } else {
      console.log('세션 없음\n')
      res.status(201).send('세션 없음')
    }
})

module.exports = router
