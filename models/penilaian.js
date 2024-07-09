const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const detail_penilaian = require('./detail_penilaian')

const penilaian = sequelize.define('penilaian', {
    id_penilaian:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true, 
        defaultValue: DataTypes.UUIDV4
    },
    id_responden:{
        type: DataTypes.UUID,
        allowNull: false
    },
    hasil_akhir:{
        type: DataTypes.DECIMAL(10,2),
        allowNull:true
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
    tableName: 'penilaian',
    timeStamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

penilaian.hasMany(detail_penilaian, {foreignKey: 'id_penilaian'})
detail_penilaian.belongsTo(penilaian, {foreignKey: 'id_penilaian', as:'dataPenilaian'})



module.exports = penilaian