'use strict';

var express = require('express');
var router = express.Router();
var mw = require('../middleware')
var users = require('./users')
var projects = require('./projects')
// console.log("Ma Chu"+router.post);
router.post('/register',users.collect,users.register,mw.respond,mw.error);
router.post('/developer/add',users.collect,users.addDev,mw.respond,mw.error);
router.get('/list',users.retrieve,mw.respond,mw.error);
router.get('/developers/list',users.listDevs,mw.respond,mw.error);

router.post('/project/add',projects.collect,projects.add,mw.respond,mw.error)
router.get('/project/list',projects.retrieve,mw.respond,mw.error)
// router.get('/')
module.exports = router;
// console.log(router.route);
