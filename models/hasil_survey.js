const {DataTypes} = require('sequelize')
const sequelize = require('../config/db')

const hasil_survey = sequelize.define('hasil_survey', {
    id_hasil_survey:{
        type: DataTypes.UUID,
        allowNull: false,
        primaryKey: true,
        defaultValue: DataTypes.UUIDV4
    },
    id_admin:{
        type: DataTypes.UUID,
        allowNull: false
    },
    nilai_akhir_survey:{
        type: DataTypes.DECIMAL(10,2),
        allowNull: false
    },
    periode_awal:{
        type: DataTypes.DATE,
        allowNull: false,
    },
    periode_akhir:{
        type: DataTypes.DATE,
        allowNull: false
    },
    file_skm:{
        type: DataTypes.STRING(255),
        allowNull: true
    },
    created_at:{
        type: DataTypes.DATE,
        allowNull: false
    },
    updated_at:{
        type: DataTypes.DATE,
        allowNull:false
    }
}, {
    tableName: 'hasil_survey',
    timeStamps: true, 
    createdAt: 'created_at',
    updatedAt: 'updated_at'
})

module.exports = hasil_survey