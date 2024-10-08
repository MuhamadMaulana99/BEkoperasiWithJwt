// const { DataTypes } = require('sequelize')
// const sequelize = require('./index.js')

module.exports = (sequelize, DataTypes)=>{
    const loginModel = sequelize.define('tb_users',{
        id_users: {
            type: DataTypes.INTEGER,  // Changed to INTEGER
            autoIncrement: true,      // Set autoIncrement
            primaryKey: true,          // Set as primary key
            allowNull: false,          // Prevent null values for primary key
        },
        username: {
            type: DataTypes.STRING(20),
            default: null,
        },
        password: {
            type: DataTypes.STRING(20),
            default: null,
        },
        userRoles: {
            type: DataTypes.STRING(50),
            default: null,
        },
    })
    loginModel.associate = (models) => {
        loginModel.hasMany(models.tb_angsuran, { // Pastikan menggunakan nama model dengan benar
            foreignKey: 'id_users',
            as: 'angsuran', // Alias untuk relasi
        });
        loginModel.hasMany(models.tb_pengajuan, { // Pastikan menggunakan nama model dengan benar
            foreignKey: 'id_users',
            as: 'pengajuan', // Alias untuk relasi
        });
        loginModel.hasMany(models.tb_permohonan, { // Pastikan menggunakan nama model dengan benar
            foreignKey: 'id_users',
            as: 'permohonan', // Alias untuk relasi
        });
    };
    return loginModel;
}