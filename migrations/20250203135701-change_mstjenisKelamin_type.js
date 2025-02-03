module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tb_mst_nasabah', 'mstjenisKelamin', {
      type: Sequelize.JSON, // Ubah tipe ke JSON atau tipe lain yang diinginkan
      allowNull: true,      // Sesuaikan dengan kebutuhan
    });
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.changeColumn('tb_mst_nasabah', 'mstjenisKelamin', {
      type: Sequelize.TEXT, // Kembalikan ke tipe sebelumnya jika rollback
      allowNull: true,
    });
  },
};
