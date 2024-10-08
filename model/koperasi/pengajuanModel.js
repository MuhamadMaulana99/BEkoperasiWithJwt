module.exports = (sequelize, DataTypes) => {
    const pengajuan = sequelize.define('tb_pengajuan', {
        id_pengajuans: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false,
        },
        id_users: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_users',  // Pastikan tabel tb_users sudah ada
                key: 'id_users',    // Kolom yang direferensikan
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        id_mst_nasabah: {
            type: DataTypes.INTEGER,
            allowNull: false,
            references: {
                model: 'tb_mst_nasabah',  // Pastikan tabel tb_mst_nasabah sudah ada
                key: 'id_mst_nasabah',    // Kolom yang direferensikan
            },
            onUpdate: 'CASCADE',
            onDelete: 'CASCADE',
        },
        rekening: {
            type: DataTypes.STRING(50),
            defaultValue: null,  // Mengganti default menjadi defaultValue
        },
        namaNasabah: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        penjualan: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        hargaPokok: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        biaya: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        labaUsaha: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        pendapatanLain: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        jumlahPendapatan: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        kebutuhanRumahTangga: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        biayaPendidikan: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        biayaLainya: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        jumlahBiayaLuarUsaha: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        pendapatanBersih: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        rasioAngsuran: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        jangkaWaktu: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        nominalPermohonan: {
            type: DataTypes.INTEGER,
            defaultValue: null,
        },
        tujuanPembiayaan: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        jaminan: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        accPermohonan: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        nomorAkad: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        status: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        statusBy: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        statusAt: {
            type: DataTypes.STRING(50),
            defaultValue: null,
        },
        foto: {
            type: DataTypes.STRING,
            defaultValue: null,
        },
    }, {
        tableName: 'tb_pengajuan',  // Pastikan nama tabel sesuai
        timestamps: true,
    });
    pengajuan.associate = (models) => {
        pengajuan.belongsTo(models.loginModel, {
            foreignKey: 'id_users',
            as: 'user', // Alias untuk relasi
        });
        pengajuan.belongsTo(models.tb_mst_nasabah, {
            foreignKey: 'id_mst_nasabah',
            as: 'nasabah', // Alias untuk relasi
        });
    };
    return pengajuan;
};
