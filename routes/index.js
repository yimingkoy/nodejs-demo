var express = require('express');
var router = express.Router();

/* GET home page. */
router.all('/login', notAuthentication);
router.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' });
});

router.get('/login', function(req, res, next) {
  res.render('login', {title: '用户登录'});
});
router.post('/login', dologin);

router.get('/home', authentication);
router.get('/home', function(req, res, next) {
  res.render('home', {title: 'Home'});
});

router.get('/logout', authentication);
router.get('/logout', function(req, res) {
  req.session.user=null;
  res.redirect('/');
});

function dologin(req, res, next) {
  var user = {
    username: 'admin',
    password: 'admin'
  };
  if(req.body.username === user.username && req.body.password === user.password) {
    req.session.user = user;
    
    return res.redirect('/home');
  } else {
    req.session.error='用户名或密码不正确';
    return res.redirect('/login');
  }
}

function authentication(req, res, next) {
  if(!req.session.user) {
    req.session.error = '请先登录';
    return res.redirect('/login');
  }
  next();
}

function notAuthentication(req, res, next) {
  if(req.session.user) {
    req.session.error = '已登录';
    return res.redirect('/');
  }
  next();
}
module.exports = router;
