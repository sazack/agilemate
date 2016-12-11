'use strict';
module.exports = function(sequelize, DataTypes) {
  var project_tasks = sequelize.define('project_tasks', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    is_deleted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        project_tasks.belongsTo(models.users)
        project_tasks.belongsTo(models.project_sprints)
        project_tasks.belongsTo(models.projects)
        // associations can be defined here
        // project_tasks.hasMany(models.users)
      }
    }
  });
  return project_tasks;
};
