"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    // Menambahkan kolom KelasId ke tabel Siswas
    await queryInterface.addColumn("Siswas", "KelasId", {
      type: Sequelize.INTEGER,
      allowNull: true, // Sementara kita bolehkan null, nanti bisa diubah jadi false
      references: {
        model: "Kelas", // Nama tabel yang dituju
        key: "id", // Kolom PK di tabel yang dituju
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL", // Jika kelas dihapus, KelasId siswa jadi null
    });
  },

  async down(queryInterface, Sequelize) {
    // Menghapus kolom KelasId dari tabel Siswas jika rollback
    await queryInterface.removeColumn("Siswas", "KelasId");
  },
};
