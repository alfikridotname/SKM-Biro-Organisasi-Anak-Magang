const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const saran = require('./saran')
const penilaian = require('./penilaian')

const responden = sequelize.define('responden', {
    id_responden:{
        type:DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    nama:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    email: {
        type:DataTypes.STRING(100),
        allowNull: false
    },
    jenis_kelamin:{
        type: DataTypes.STRING(20),
        allowNull: false
    },
    usia:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    pekerjaan:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    jenjang_pendidikan:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull:false,
    },
    updated_at: {
        type: DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'responden',
    timeStamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

responden.hasMany(saran, {foreignKey: 'id_responden', as:'dataSaran'})
saran.belongsTo(responden, {foreignKey: 'id_responden'})

responden.hasMany(penilaian, {foreignKey: 'id_penilaian'})
penilaian.belongsTo(responden, {foreignKey: 'id_responden', as: 'dataResponden'})

module.exports = responden