'use strict';

var model= require('../models')

module.exports = {
  create:function(options,success,error){
    options.data.is_deleted = 0
    model.project_devs.create(options.data).then(success,error);
  },
  retrieve:function(options,success,error){
    options.where.is_deleted = 0
    model.project_devs.findAll(options).then((data)=>{
      success(JSON.parse(JSON.stringify(data)))
    },error);
  },
  update:function(options,success,error){
    console.log(options);
    model.project_devs.update(options.data,{where:options.where}).then(success,error);
  },
  viewMyProjects:function(options,success,error){
    model.project_devs.findAll({
      where:options.where,
      include:[{
        model:model.projects
      }]
    }).then((data)=>{
      success(JSON.parse(JSON.stringify(data)))
    },error)
  }
}
