'use strict';
module.exports = function(sequelize, DataTypes) {
  var project_devs = sequelize.define('project_devs', {
    is_deleted: DataTypes.BOOLEAN,
    status: DataTypes.BOOLEAN
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
        project_devs.belongsTo(models.projects)
      }
    }
  });
  return project_devs;
};
