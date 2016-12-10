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
// router.get('/developers/:username',users.collect,users.searchDevs,mw.respond,mw.error);

router.post('/project/add',projects.collect,projects.add,mw.respond,mw.error)
router.get('/project/list',projects.retrieve,mw.respond,mw.error)
router.get('/project/:name',projects.collect,projects.findByName,mw.respond,mw.error)
router.post('/project/developers/add',projects.addDevelopers,mw.respond,mw.error)
router.get('/project/developers/:id',projects.collect,projects.viewProjectDevelopers,mw.respond,mw.error)
// router.get('/')
module.exports = router;
// console.log(router.route);
