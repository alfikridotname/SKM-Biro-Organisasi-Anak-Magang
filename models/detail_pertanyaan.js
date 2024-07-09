const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')
const pertanyaan = require('./pertanyaan')

const detail_pertanyaan = sequelize.define('detail_pertanyaan', {
    id_detail_pertanyaan:{
        type: DataTypes.UUID,
        allowNull: false, 
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    id_pertanyaan:{
        type: DataTypes.UUID,
        allowNull: false
    },
    pilihan_kriteria:{
        type: DataTypes.STRING(100),
        allowNull: false,
    },
    nilai_pilihan:{
        type: DataTypes.INTEGER(1),
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
    tableName: 'detail_pertanyaan',
    timeStamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})



module.exports = detail_pertanyaan