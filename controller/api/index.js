'use strict'
var mw = require('./middleware');
var user = require('./user')
var jwt = require('../../lib/jwt_middleware')
var users = require('./user/users')
// console.log(user);

module.exports = function(app){

  app.use('/user',jwt.jwtAuth,user)

  app.post('/login',users.collect,users.authenticate,mw.respond,mw.error);

  app.post('/register',users.collect,users.register,mw.respond,mw.error);


  app.get('/template/:folderName/:fileName', (req,res,next)=>{
		if(req.params.folderName && req.params.fileName){
	  		res.render(req.params.folderName+'/'+req.params.fileName)
		}
  })

}
