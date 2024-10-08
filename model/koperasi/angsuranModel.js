module.exports = (sequelize, DataTypes)=>{
    const angsuran = sequelize.define('tb_angsuran',{
        id_angsurans: {
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
        nomorAkad: {
            type: DataTypes.STRING(255),
            default: null,
        },
        // namaNasabah: {
        //     type: DataTypes.STRING(255),
        //     default: null,
        // },
        staffBasil: {
            type: DataTypes.INTEGER(11),
            default: null,
        },
        staffPokok: {
            type: DataTypes.INTEGER(11),
            default: null,
        },
        accBasil: {
            type: DataTypes.INTEGER(11),
            default: null,
        },
        accPokok: {
            type: DataTypes.INTEGER(11),
            default: null,
        },
        staffBy: {
            type: DataTypes.STRING(255),
            default: null,
        },
        staffAt: {
            type: DataTypes.DATE,
            default: null,
        },
        kasirBy: {
            type: DataTypes.STRING(255),
            default: null,
        },
        kasirAtt: {
            type: DataTypes.INTEGER(11),
            default: null,
        },
        lokasiPembayaran: {
            type: DataTypes.STRING(255),
            default: null,
        },
    }, {
        tableName: 'tb_angsuran',  // Pastikan nama tabel sesuai
        timestamps: true,
    })
    angsuran.associate = (models) => {
        angsuran.belongsTo(models.loginModel, {
            foreignKey: 'id_users',
            as: 'user', // Alias untuk relasi
        });
        angsuran.belongsTo(models.tb_mst_nasabah, {
            foreignKey: 'id_mst_nasabah',
            as: 'nasabah', // Alias untuk relasi
        });
    };
    return angsuran;
}