'use strict';
module.exports = function(sequelize, DataTypes) {
  var projects = sequelize.define('projects', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    platform: DataTypes.STRING,
    deadline: DataTypes.DATE,
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
        projects.hasMany(models.project_sprints)

      }
    }
  });
  return projects;
};
