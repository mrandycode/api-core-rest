const { Model, DataTypes, Sequelize } = require('sequelize');
const { SURGERY_HEAD_TABLE } = require('../health/surgery-head.model');
const SURGERY_DETAIL_TABLE = 'surgeries_detail';

const SurgeryDetailSchema = {
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
    },
    surgeryHeadId: {
        field: 'surgery_head_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: SURGERY_HEAD_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    },
}

class SurgeryDetail extends Model {
    static associate(models) {
        this.belongsTo(models.SurgeryHead,{ as: 'surgeryHead' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SURGERY_DETAIL_TABLE,
            modelName: 'SurgeryDetail',
            timestamps: true
        }
    }
}

module.exports = {
    SURGERY_DETAIL_TABLE,
    SurgeryDetailSchema,
    SurgeryDetail
}
