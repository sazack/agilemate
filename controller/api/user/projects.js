'use strict';

var projects = require('../../../repository/projects');
var users = require('../../../repository/user');
var project_devs = require('../../../repository/project_devs');

module.exports = {

  collect:(req,res,next)=>{
    console.log("Thokyo");
    var fields = ['id','name','description','platform','deadline']
    var reqdata = new req.collect(req,fields);

    req.agileMate_ProjData = reqdata.collect(req,res)
    // console.log(req.agileMate_ProjData);
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
        is_deleted:0,
        userId:req.user.id
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
  },
  findByName: (req,res,next)=>{
    if(!req.agileMate_ProjData.name) next(new Error("Project Name not Provided"));
    else{
      var options = {
        where:{
          name:req.agileMate_ProjData.name,
          // is_deleted:0
        }
      }
      projects.retrieve(options,success,error)
      function success(result){
        console.log(result);
        if(result && !result.length) return next(new Error("The Project Doesn't exist"))
        else{
          req.cdata={
            success:1,
            message:"Project Data retrieved",
            data:result
          }
          next();
        }
      }
      function error(err){
        if(err) return next(err);
      }
    }
  },
  addDevelopers: (req,res,next)=>{
    req.body.developers.forEach((item,index)=>{
      req.body.developers[index] = req.sanitize(item)
    })
    req.agileMate_ProjData = req.body.developers
    console.log(req.agileMate_ProjData);
    return new req.Promise.all(req.agileMate_ProjData.map((item)=>{
      return new Promise((resolve,reject)=>{
        let options = {
          where:{
            email:item
          }
        }
        users.retrieve(options,resolve,reject)
      }).
      then((userData)=>{
        var projectId = req.body.id
        return new Promise((resolve,reject)=>{
          let options = {
            data:{
              userId:userData[0].id,
              projectId: projectId
            }
          }
          console.log(options);
          project_devs.create(options,success,reject)
          function success(result){
            // console.log(result);
            if(!result.$options.isNewRecord) return next(new Error("Some Error Occured During Database Entry"));
            else{
              req.cdata={
                success:1,
                message:'Developers Added to Project Successfully'
              }
              next();
            }
          }
        })
      })
    })).
    catch((error)=>{
      console.log(error);
      return ext(new Error(error))
    })
  },
  viewProjectDevelopers: (req,res,next)=>{
    return new req.Promise((resolve,reject)=>{
      var options={
        where:{
          projectId:req.agileMate_ProjData.id
        }
      }
      project_devs.retrieve(options,resolve,reject)
    }).
    then((projData)=>{
      return new req.Promise.all(projData.map((item)=>{
        // console.log(item);
        return new Promise((resolve,reject)=>{
          // console.log(item);
          var options = {
            where:{
              id:item.userId
            }
          }
          // console.log(options);
          users.retrieve(options,resolve,reject)
          }
        )
      })).
      then((userInfo)=>{
        req.cdata={
          success:1,
          message:"developers Listed",
          data:userInfo
        }
        // console.log("Yaha chu");
        // console.log(req.cdata.data);
        next();
      })
    }).
    catch((error)=>{
      console.log(error);
      return next(new Error(error));
    })
  }
}
