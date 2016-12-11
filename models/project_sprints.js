'use strict';
module.exports = function(sequelize, DataTypes) {
  var project_sprints = sequelize.define('project_sprints', {
    name: DataTypes.STRING,
    description:DataTypes.TEXT,
    status: DataTypes.BOOLEAN,
    from:DataTypes.DATE,
    to:DataTypes.DATE,
    is_deleted:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
    },
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        project_sprints.belongsTo(models.projects)
      }
    }
  });
  return project_sprints;
};
