'use strict';

var projects = require('../../../repository/projects')

module.exports = {

  collect:(req,res,next)=>{
    var fields = ['id','name','description','platform','deadline']
    var reqdata = new req.collect(req,fields);

    req.agileMate_ProjData = reqdata.collect(req,res)
    next();
  },

  add:(req,res,next)=>{
    if(req.agileMate_ProjData.id) return next(new Error("Id Should not be Provided"));
    else{
      var options={
        data:req.agileMate_ProjData
      }
      options.data.userId = req.user.id
      console.log(options)
      projects.create(options,success,error)
      function success(result){
        if(!result.$options.isNewRecord) return next(new Error("Record Could Not be Added"));
        else{
          req.cdata={
            success:1,
            message:"Project Added Successfully",
          }
          next();
        }
      }
      function error(err){
        if(err) return next(err);
      }
    }
  },
  retrieve: (req,res,next)=>{
    var options={
      where:{
        is_deleted:0
      }
    }
    projects.retrieve(options,success,error)
    function success(result){
      if(result && result.length){
        // console.log(result);
        req.cdata={
          success:1,
          message:"Projects retrieved successfully",
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
