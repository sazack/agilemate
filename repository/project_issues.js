'use strict';

var model= require('../models')

module.exports = {
  create:function(options,success,error){
    options.data.is_deleted = 0
    model.project_issues.create(options.data).then(success,error);
  },
  retrieve:function(options,success,error){
    // options.where.is_deleted = 0
    console.log(options);
    model.project_issues.findAll({
      where:options.where,
      include:[
        {
          model:model.users,
          model:model.projects
        }
      ]
    }).then((data)=>{
      success(JSON.parse(JSON.stringify(data)))
    },error);
  },
  update:function(options,success,error){
    console.log(options);
    model.project_issues.update(options.data,{where:options.where}).then(success,error);
  },
  totalProjectDetails:function(options,success,error){
    model.users.findAll({
      where:options.where,
      include:[
        {
          model:model.project_devs
        }
      ]
    }).then((data)=>{
      success(JSON.parse(JSON.stringify(data)))
    },error)
  }
}
