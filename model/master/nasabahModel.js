const loginModels = require("../Auth/loginModels");

module.exports = (sequelize, DataTypes) => {
    const masterNasabah = sequelize.define('tb_mst_nasabah', {
        id_mst_nasabah: {
            type: DataTypes.INTEGER,  // Changed to INTEGER
            autoIncrement: true,      // Set autoIncrement
            primaryKey: true,          // Set as primary key
            allowNull: false,          // Prevent null values for primary key
        },
        nama: {
            type: DataTypes.STRING(50),
            default: null,
        },
        mstRekening: {
            type: DataTypes.STRING(50),
            default: null,
        },
        mstNik: {
            type: DataTypes.STRING(50),
            default: null,
        },
        mstjenisKelamin: {
            type: DataTypes.TEXT,
            default: null,
        },
        mstAlamat: {
            type: DataTypes.STRING(50),
            default: null,
        },
        mstKecamatan: {
            type: DataTypes.STRING(50),
            default: null,
        },
        mstKabupaten: {
            type: DataTypes.STRING(50),
            default: null,
        },
        mstProvinsi: {
            type: DataTypes.STRING(50),
            default: null,
        },
    }, {
        tableName: 'tb_mst_nasabah',  // Pastikan nama tabel sesuai
        timestamps: true,
    })
    masterNasabah.associate = (models) => {
        masterNasabah.hasMany(models.tb_mst_nasabah, { // Pastikan menggunakan nama model dengan benar
            foreignKey: 'id_mst_nasabah',
            as: 'nasabah', // Alias untuk relasi
        });
        // masterNasabah.hasMany(models.tb_permohonan, { // Pastikan menggunakan nama model dengan benar
        //     foreignKey: 'id_mst_nasabah',
        //     as: 'permohonan', // Alias untuk relasi
        // });
    };
    return masterNasabah;
}