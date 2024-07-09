const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const detail_penilaian = sequelize.define('detail_penilaian', {
    id_detail_penilaian:{
        type:DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    id_penilaian:{
        type: DataTypes.UUID,
        allowNull: false
    },
    id_pertanyaan:{
        type: DataTypes.UUID,
        allowNull: false
    },
    nilai_pertanyaan:{
        type: DataTypes.INTEGER(1),
        allowNull: false
    },
    NNR:{
        type: DataTypes.DECIMAL(10,2),
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
    tableName: 'detail_penilaian',
    timeStamps: true,
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = detail_penilaian