'use strict';

var tasks = require('../../../repository/project_tasks');
var users = require('../../../repository/user');

module.exports = {
  collect: (req,res,next)=>{
    var fields = ['id','name','description','status','userId','projectId','projectSprintId'];
    var reqdata = new req.collect(req,fields);

    req.agileMate_taskData = reqdata.collect(req,res);
    console.log(req.agileMate_taskData);
    next();
  },
  add:(req,res,next)=>{
    if(req.agileMate_taskData.id) return next(new Error("Id Should not be provided"));
    else{
      var options={
        data:req.agileMate_taskData
      }
    }
    tasks.create(options,success,error);
    function success(result){
      // console.log(result);
      if(!result.$options.isNewRecord) return next(new Error("Record not Entered"));
      else{
        req.cdata = {
          success:1,
          message:"Task created Successfully",
        }
        next();
      }
    }
    function error(err){
      if(err) return next(err);
    }
  },
  retrieve:(req,res,next)=>{
      var options = {
        where:{
          projectSprintId: req.agileMate_taskData.projectSprintId
        }
      }
      tasks.retrieve(options,success,error)
      function success(result){
        // console.log(result);
        if(result && result.length){
          req.cdata={
            success:1,
            message:"Tasks Detail Retrieved Successfully",
            data:result
          }
          next();
        }
      }
      function error(err){
        if(err) return next(err)
      }
  },
  viewMyTask:(req,res,next)=>{
    var options={
      where:{
        userId:req.user.id
      }
    }
    tasks.getMyTasks(options,success,error)
    function success(result){
      console.log(result);
      if(result&&result.length){
        // console.log(result);
        req.cdata={
          success:1,
          message:"Assigned Tasks Listed Successfully",
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
