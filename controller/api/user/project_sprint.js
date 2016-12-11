'use strict';

var sprint = require('../../../repository/project_sprint');

module.exports = {
  collect:(req,res,next)=>{
    var fields = ['id','name','from','to','description','projectId']
    var reqdata = new req.collect(req,fields);

    req.agileMate_sprintData = reqdata.collect(req,res)
    // console.log(req.agileMate_sprintData);
    next();
  },

  add: (req,res,next)=>{
    if(req.agileMate_sprintData.id) return next(new Error("Id Should not be Provided"));
    else{
      var options = {
        data:req.agileMate_sprintData
      }
      sprint.create(options,success,error);
      function success(result){
        if(!result.$options.isNewRecord) return next(new Error("Record Could not be Added"));
        else{
          req.cdata={
            success:1,
            message:"Sprint Added Successfully"
          }
          next();
        }
      }
      function error(err){
        if(err) return next(err);
      }
    }
  },
  viewSprints:(req,res,next)=>{
      var options = {
        where:{
          projectId: req.agileMate_sprintData.id
        }
      }
      sprint.retrieve(options,success,error)
      function success(result){
        if(result && result.length){
          // console.log(result);
          req.cdata={
            success:1,
            message:"Sprint retrieved Successfully",
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
