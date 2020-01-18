const express = require('express')
const router = express.Router()

router.route('/users/signout').post(function(req, res) {
    let sess = req.session
  
    if(sess.email){ 
      req.session.destroy(err => {
          if (err) {
              console.log(err);
              res.status(404).send('error!')
          } else {
              console.log('로그아웃 됨')
              res.status(200).send(`${sess.email} 사용자 로그아웃 되었습니다!`)
          }
      })
    } else {
      //res.redirect('/');
      console.log('세션 없음')
      res.status(200).send('세션 없음')
    }
})

module.exports = router
