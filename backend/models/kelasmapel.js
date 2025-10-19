'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class KelasMapel extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  KelasMapel.init({
    KelasId: DataTypes.INTEGER,
    MapelId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'KelasMapel',
  });
  return KelasMapel;
};