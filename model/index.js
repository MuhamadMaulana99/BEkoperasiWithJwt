// index.js
const Sequelize = require('sequelize');

// Inisialisasi koneksi Sequelize
const sequelize = new Sequelize('db_koperasi', 'root', '', {
  host: 'localhost',
  dialect: 'mysql'
});

// Import model
const pengajuan = require('./koperasi/pengajuanModel.js')(sequelize, Sequelize.DataTypes);
const angsuran = require('./koperasi/angsuranModel.js')(sequelize, Sequelize.DataTypes);
const permohonan = require('./koperasi/permohonanModel.js')(sequelize, Sequelize.DataTypes);
const masterAnalisa = require('./master/analisaModel.js')(sequelize, Sequelize.DataTypes);
const masterNasabah = require('./master/nasabahModel.js')(sequelize, Sequelize.DataTypes);
const loginModel = require('./Auth/loginModels.js')(sequelize, Sequelize.DataTypes);

// Hubungkan relasi
pengajuan.belongsTo(loginModel, { foreignKey: 'id_users' });
pengajuan.belongsTo(masterNasabah, { foreignKey: 'id_mst_nasabah' });

// Hubungkan relasi antara loginModel dan angsuran
angsuran.belongsTo(loginModel, {
  foreignKey: 'id_users',
  as: 'user', // Alias untuk relasi
});

angsuran.belongsTo(masterNasabah, {
  foreignKey: 'id_mst_nasabah',
  as: 'nasabah', // Alias untuk relasi
});

pengajuan.belongsTo(loginModel, {
  foreignKey: 'id_users',
  as: 'user', // Alias untuk relasi
});

pengajuan.belongsTo(masterNasabah, {
  foreignKey: 'id_mst_nasabah',
  as: 'nasabah', // Alias untuk relasi
});

permohonan.belongsTo(loginModel, {
  foreignKey: 'id_users',
  as: 'user', // Alias untuk relasi
});

permohonan.belongsTo(masterNasabah, {
  foreignKey: 'id_mst_nasabah',
  as: 'nasabah', // Alias untuk relasi
});

// Buat objek db
const db = {
  sequelize,
  models: { loginModel, angsuran, permohonan, pengajuan, masterAnalisa, masterNasabah },
};

try {
    sequelize.authenticate();
    console.log('Connection has been established successfully.');
} catch (error) {
    console.error('Unable to connect to the database:', error);
}

module.exports = db;
