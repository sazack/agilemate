'use strict';

var users = require('../../../repository/user');
var config = require('../../../config/config.js')
const jwt   = require('jsonwebtoken')
const bcrypt = require('bcrypt');

module.exports = {
  collect: (req,res,next)=>{
    var fields = ['id','name','email','address','phone','username','password','user_type','organization_id'];
    var reqdata = new req.collect(req,fields);

    req.agileMate_userData = reqdata.collect(req,res)
    console.log(req.agileMate_userData);
    next()
  },
  register: (req,res,next)=>{
    if(req.agileMate_userData.id) return next(new Error("Id Should not be provided"));
    bcrypt.genSalt(10,function(err,salt){
      bcrypt.hash(req.agileMate_userData.password,salt,cb);
    });
    var cb = (err,hash)=>{
      if(err) return next(new Error(err));
      if(hash){
        var options = {
          data: req.agileMate_userData
        }
        options.data.password=hash;
        users.create(options,success,error);
        function success(result){
          console.log(result.length);
          if(!result.$options.isNewRecord) return next(new Error("User Record not Added"));
          else{
            var result = JSON.parse(JSON.stringify(result))
            var token = jwt.sign({id:result.id,email:req.agileMate_userData.email,username:req.agileMate_userData.username},config.jwtSecret,{expiresIn:60*60});
            req.cdata={
              success:1,
              message:"User registered Successfully",
              token:token
            }
            next();
          }
        }
        function error(err){
          if(err) return next(err);
        }
      }
    }
  },
  authenticate: (req,res,next)=>{
    var collectObj = new req.collect();
    collectObj.setMandatoryFields(['username','password'])
    if(collectObj.checkMandatoryFields(req.agileMate_userData,res)) return next();
    else{
      let options = {
        username:req.agileMate_userData.username
      }
      users.login(options,success,error);
      function success(result){
        if(result && !result.length) return next(new Error("Username/Password Invalid"));
        else{
          var userInfo = result[0];
          bcrypt.compare(req.agileMate_userData.password,userInfo.password,(err,res)=>{
            if(err || !res) return next(err || new Error("Username/Password Invalid"));
            if(res){
              var token = jwt.sign({id:userInfo.id,email:userInfo.email,username:userInfo.username,user_type:userInfo.user_type},config.jwtSecret,{expiresIn:60*60});
              req.cdata={
                success:1,
                user_id:userInfo.id,
                token:token,
                username:userInfo.username,
                user_type:userInfo.user_type,
                status:userInfo.status
              }
              next();
            }
          })
        }
      }
      function error(err){
        if(err) return next(err);
      }
    }
  },
  retrieve:(req,res,next)=>{
    var options ={
      where:{

      }
    }
    users.retrieve(options,success,error)
    function success(result){
      if(result && result.length){
        req.cdata={
          success:1,
          message:"users retrieved successfully",
          data:result
        }
        next();
      }
    }
    function error(err){
      if(err) return next(err);
    }
  },
  addDev: (req,res,next)=>{
    if(req.agileMate_userData.id) return next(new Error("Id Should not be provided"));
    bcrypt.genSalt(10,function(err,salt){
      bcrypt.hash(req.agileMate_userData.password,salt,cb);
    });
    var cb = (err,hash)=>{
      if(err) return next(new Error(err));
      if(hash){
        var options = {
          data: req.agileMate_userData
        }
        options.data.password=hash;
        options.data.organization_id= req.user.id
        options.data.user_type =2
        users.create(options,success,error);
        function success(result){
          console.log(result.length);
          if(!result.$options.isNewRecord) return next(new Error("User Record not Added"));
          else{
            // var result = JSON.parse(JSON.stringify(result))
            // var token = jwt.sign({id:result.id,email:req.agileMate_userData.email,username:req.agileMate_userData.username},config.jwtSecret,{expiresIn:60*60});
            req.cdata={
              success:1,
              message:"User registered Successfully",
              // token:token
            }
            next();
          }
        }
        function error(err){
          if(err) return next(err);
        }
      }
    }
  },
  listDevs: (req,res,next) =>{
    var options={
      where:{
        organization_id:req.user.id
      }
    }
    users.retrieve(options,success,error);
    function success(result){
      // console.log(result);
      if(result && result.length){
        req.cdata={
          success:1,
          message:"Company's Developer Listed",
          data:result
        }
        next();
      }
    }
    function error(err){
      if(err) return next(err);
    }
  }
}
