module.exports = (sequelize, DataTypes) => {
    const permohonan = sequelize.define('tb_Permohonan', {
        id_permohonans: {
            type: DataTypes.INTEGER,  // Changed to INTEGER
            autoIncrement: true,      // Set autoIncrement
            primaryKey: true,          // Set as primary key
            allowNull: false,          // Prevent null values for primary key
        },
        id_users: {
            type: DataTypes.INTEGER,  // Menjadikan id_users sebagai foreign key
            allowNull: false,         // Tidak boleh bernilai null
            references: {             // Mendefinisikan relasi foreign key
                model: 'tb_users',       // Nama tabel yang direferensikan (misalnya tabel `users`)
                key: 'id_users',      // Primary key di tabel yang direferensikan
            },
            onUpdate: 'CASCADE',      // Mengatur agar ketika data di tabel users di-update, data di tabel ini juga ikut ter-update
            onDelete: 'CASCADE',      // Mengatur agar ketika data di tabel users dihapus, data di tabel ini juga ikut terhapus
        },
        id_mst_nasabah: {
            type: DataTypes.INTEGER,  // Menjadikan id_mst_nasabah sebagai foreign key
            allowNull: false,         // Tidak boleh bernilai null
            references: {             // Mendefinisikan relasi foreign key
                model: 'tb_mst_nasabah',       // Nama tabel yang direferensikan (misalnya tabel `users`)
                key: 'id_mst_nasabah',      // Primary key di tabel yang direferensikan
            },
            onUpdate: 'CASCADE',      // Mengatur agar ketika data di tabel users di-update, data di tabel ini juga ikut ter-update
            onDelete: 'CASCADE',      // Mengatur agar ketika data di tabel users dihapus, data di tabel ini juga ikut terhapus
        },
        statusPermohonan: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        hasilPermohonan: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
        persentase: {
            type: DataTypes.INTEGER(11),
            defaultValue: false,
        },
        saldoTabungan: {
            type: DataTypes.INTEGER(11),
            default: null,
        },
    }, {
        tableName: 'tb_Permohonan',  // Pastikan nama tabel sesuai
        timestamps: true,
    })
    permohonan.associate = (models) => {
        permohonan.belongsTo(models.loginModel, {
            foreignKey: 'id_users',
            as: 'user', // Alias untuk relasi
        });
        permohonan.belongsTo(models.tb_mst_nasabah, {
            foreignKey: 'id_mst_nasabah',
            as: 'nasabah', // Alias untuk relasi
        });
    };
    // permohonan.associate = (models) => {
    //     // console.log(models, 'ssss')
    //     permohonan.belongsTo(models.tb_users, { foreignKey: 'id_users', as: 'user' });
    //     permohonan.belongsTo(models.tb_mst_nasabah, { foreignKey: 'id_mst_nasabah', as: 'nasabah' });
    // };
    return permohonan;
}