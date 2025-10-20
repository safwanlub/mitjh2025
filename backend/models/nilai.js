"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Nilai extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Nilai.belongsTo(models.Siswa, { foreignKey: "SiswaId", as: "Siswa" });
      Nilai.belongsTo(models.Mapel, { foreignKey: "MapelId", as: "Mapel" });
    }
  }
  Nilai.init(
    {
      tugas: DataTypes.INTEGER,
      uts: DataTypes.INTEGER,
      uas: DataTypes.INTEGER,
      SiswaId: DataTypes.INTEGER,
      MapelId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "Nilai",
    }
  );
  return Nilai;
};
