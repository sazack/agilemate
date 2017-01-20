'use strict';
module.exports = function(sequelize, DataTypes) {
  var project_issues = sequelize.define('project_issues', {
    name: DataTypes.STRING,
    descriptions: DataTypes.TEXT,
    reportedBy:DataTypes.INTEGER,
    status: DataTypes.BOOLEAN,
    is_deleted: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        project_issues.belongsTo(models.users)
        project_issues.belongsTo(models.projects)
      }
    }
  });
  return project_issues;
};
