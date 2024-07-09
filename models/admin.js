const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const admin = sequelize.define('admin', {
    id_admin:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    username: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(100),
        allowNull: false
    },
    nama:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    foto: {
        type: DataTypes.STRING(255),
        allowNull: true
    },
    password:{
        type: DataTypes.STRING(256),
        allowNull: false
    },
    created_at:{
        type:DataTypes.DATE,
        allowNull: false
    },
    updated_at: {
        type:DataTypes.DATE,
        allowNull: false
    }
}, {
    tableName: 'admin',
    timeStamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = admin