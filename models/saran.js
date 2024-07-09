const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const saran = sequelize.define('saran', {
    id_saran:{
        type: DataTypes.UUID,
        allowNull:false,
        primaryKey: true,
        timeStamps: true,
        defaultValue: DataTypes.UUIDV4
    },
    id_responden:{
        type: DataTypes.UUID,
        allowNull: false
    },
    saran_teks:{
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
    tableName: 'saran',
    timeStamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})



module.exports = saran