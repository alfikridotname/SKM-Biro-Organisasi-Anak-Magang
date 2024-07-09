const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const detail_pertanyaan = require('../models/detail_pertanyaan')
const detail_penilaian = require('./detail_penilaian')

const pertanyaan = sequelize.define('pertanyaan', {
    id_pertanyaan:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    teks_pertanyaan:{
        type: DataTypes.STRING,
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'pertanyaan',
    timeStamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

pertanyaan.hasMany(detail_pertanyaan, { foreignKey: 'id_pertanyaan', as: 'dataDetailPertanyaan'});
detail_pertanyaan.belongsTo(pertanyaan, { foreignKey: 'id_pertanyaan', as: 'dataPertanyaan'})

pertanyaan.hasMany(detail_penilaian, {foreignKey: 'id_pertanyaan', as: 'dataDetailPenilaian'})
detail_penilaian.belongsTo(pertanyaan, {foreignKey: 'id_pertanyaan', as: 'dataPertanyaan'})

module.exports = pertanyaan