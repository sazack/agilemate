'use strict';

var model= require('../models')

module.exports = {
  create:function(options,success,error){
    options.data.is_deleted = 0
    model.users.create(options.data).then(success,error);
  },
  retrieve:function(options,success,error){
    // options.where.is_deleted = 0
    model.users.findAll(options).then((data)=>{
      success(JSON.parse(JSON.stringify(data)))
    },error);
  },
  update:function(options,success,error){
    console.log(options);
    model.users.update(options.data,{where:options.where}).then(success,error);
  },
  login:function(options,success,error){
    var query={
        where:
            {
                $or: [{username:options.username},{email:options.username}]
            }
        };
    model.users.findAll(query).then(success,error);
  }
}
