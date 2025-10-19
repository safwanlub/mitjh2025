"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Kelas extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.Siswa, {
        foreignKey: "KelasId",
        as: "Siswas",
      });
      this.belongsToMany(models.Mapel, {
        through: models.KelasMapel,
        foreignKey: "KelasId",
        otherKey: "MapelId",
        as: "Mapels",
      });
    }
  }
  Kelas.init(
    {
      nama_kelas: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: {
          args: true,
          msg: "Nama kelas sudah terdaftar.",
        },
        validate: {
          notNull: {
            msg: "Nama kelas tidak boleh kosong.",
          },
          notEmpty: {
            msg: "Nama kelas tidak boleh kosong.",
          },
        },
      },
    },
    {
      sequelize,
      modelName: "Kelas",
    }
  );
  return Kelas;
};
