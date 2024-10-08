module.exports = (sequelize, DataTypes)=>{
    const masterAnalisa = sequelize.define('tb_mst_analisa',{
        id_mst_parent_analisas: {
            type: DataTypes.INTEGER,  // Changed to INTEGER
            autoIncrement: true,      // Set autoIncrement
            primaryKey: true,          // Set as primary key
            allowNull: false,          // Prevent null values for primary key
        },
        kodeAnalisa: {
            type: DataTypes.INTEGER(11),
            default: null,
        },
        nama: {
            type: DataTypes.STRING(50),
            default: null,
        },
    })
    return masterAnalisa;
}