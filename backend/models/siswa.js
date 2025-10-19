"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Siswa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.Kelas, { foreignKey: "KelasId", as: "Kelas" });
    }
  }
  Siswa.init(
    {
      nis: DataTypes.STRING,
      nama: DataTypes.STRING,
      alamat: DataTypes.STRING,
      tanggal_lahir: DataTypes.DATE,
    },
    {
      sequelize,
      modelName: "Siswa",
    }
  );
  return Siswa;
};
