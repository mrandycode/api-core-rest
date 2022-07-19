const { Model, DataTypes, Sequelize } = require('sequelize');
const SURGERY_HEAD_TABLE = 'surgeries_head';

const SurgeryHeadSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING(4),
    },
    name: {
        allowNull: false,
        type: DataTypes.STRING(100),
    },
    type: {
        allowNull: false,
        type: DataTypes.INTEGER(1),
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
    }
}

class SurgeryHead extends Model {
    static associate(models) {
        this.hasMany(models.SurgeryDetail, {
            as: 'surgeryDetail',
            foreignKey: 'surgeryHeadId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SURGERY_HEAD_TABLE,
            modelName: 'SurgeryHead',
            timestamps: true
        }
    }
}

module.exports = {
    SURGERY_HEAD_TABLE,
    SurgeryHeadSchema,
    SurgeryHead
}
