'use strict';
module.exports = function(sequelize, DataTypes) {
  var users = sequelize.define('users', {
    name: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    address: DataTypes.STRING,
    phone: DataTypes.STRING,
    user_type: DataTypes.INTEGER,
    organization_id:{
      type:DataTypes.INTEGER,
      defaultValue:null
    },
    status: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
    is_deleted: {
      type:DataTypes.BOOLEAN,
      defaultValue:false
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        users.hasMany(models.projects)
        users.hasMany(models.project_devs)
        users.hasMany(models.project_tasks)
      }
    }
  });
  return users;
};
