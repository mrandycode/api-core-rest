const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROFILE_TABLE } = require('../models/profile.model');
const PIN_ID_PROFILES_TABLE = 'pin_id_profiles';

const PinIdProfileSchema = {
    id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
    },
    country: {
        allowNull: false,
        type: DataTypes.STRING(4)
    },
    pinProfile: {
        field: 'pin_profile',
        allowNull: false,
        type: DataTypes.INTEGER(4),
        unique: 'uniquePinId_IDX01',
        comment: 'PIN generado automáticamente'
    },
    idProfile: {
        field: 'id_profile',
        allowNull: false,
        type: DataTypes.STRING(7),
        unique: 'uniquePinId_IDX01',
        comment: 'ID generado automáticamente'
    },
    status: {
        allowNull: false,
        type: DataTypes.INTEGER(1),
        defaultValue: 2,
        comment: '1 (Active) - 2 (Inactive)'
    },
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW
    },
    updatedAt: {
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW
    },
    profileId: {
        field: 'profile_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PROFILE_TABLE,
            key: 'id'
        }
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
    },
};


class PinIdProfile extends Model {
    static associate(models) {
        this.belongsTo(models.Profile, { as: 'profile' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PIN_ID_PROFILES_TABLE,
            modelName: 'PinIdProfile',
            timestamps: true
        }
    }
}

module.exports = {
    PIN_ID_PROFILES_TABLE,
    PinIdProfileSchema,
    PinIdProfile
};