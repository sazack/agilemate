'use strict';

var issues = require('../../../repository/project_issues');
var user = require('../../../repository/user')

module.exports={
  collect: (req,res,next)=>{
    var fields=['id','name','descriptions','projectId','userId'];
    var reqdata = new req.collect(req,fields);
    req.agileMate_issueData = reqdata.collect(req,res);
    console.log(req.agileMate_issueData);
    next();
  },
  create:(req,res,next)=>{
    if(req.agileMate_issueData.id) return next(new Error("Id Shouldnot be Provided"))
    else{
      var options = {
        data: req.agileMate_issueData
      }
      options.data.reportedBy= req.user.id;
      issues.create(options,success,error);
      function success(result){
        if(!result.$options.isNewRecord) return next(new Error("Error Storing to Database"));
        else{
          req.cdata={
            success:1,
            message:"Issue Created Successfully",
          }
          next();
        }
      }
      function error(err){
        if(err) return next(err);
      }
    }
  },
  retrieve:(req,res,next)=>{
    var options={
      where:{
        reportedBy: req.user.id
      }
    }
    issues.retrieve(options,success,error)
    function success(result){
      // console.log(result);
      return new req.Promise.all(result.map((item)=>{
        console.log(item.userId);
        return new Promise((resolve,reject)=>{
          var options = {
            where:{
              id:item.userId
            }
          }
          user.retrieve(options,success,error)
          function success(data){
            // result.username = data[0].username
            // reqconsole.log(data);
            req.cdata={
              success:1,
              message:"Data Retrieved Successfully",
              data: {
                result:result,
                user:data
              }
            }
            next();
          }
          function error(err){
            if(err) return next(err);
          }
        })
      }))
    }
    function error(err){
      if(err) return next(err);
    }
  },
  myIssues:(req,res,next)=>{
    var options = {
      where:{
        userId:req.user.id
      }
    }
  issues.retrieve(options,success,error)
  function success(result){
    if(result&& result.length){
      req.cdata={
        success:1,
        message:"Issues Listed Successfully",
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
