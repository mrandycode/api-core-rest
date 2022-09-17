const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROFILE_TABLE } = require('../profile.model');
const { PERSONAL_PATIENT_PROFILE_TABLE } = require('./personal-patient-profile.model');
const PET_PATIENT_TABLE = require('./pet-patient-profile.model');
const HEALTH_PROFILE = 'health_profiles';

const HealthProfileSchema = {
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
    createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'created_at',
        defaultValue: Sequelize.NOW,
    },
    updatedAt: {
        allowNull: true,
        type: DataTypes.DATE,
        field: 'updated_at',
        defaultValue: Sequelize.NOW,
    },
    personalPatientProfileId: {
        field: 'personal_patient_Id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PERSONAL_PATIENT_PROFILE_TABLE,
            key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
    },
    petPatientProfileId: {
        field: 'pet_patient_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PET_PATIENT_TABLE,
            key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
    },
    profileId: {
        field: 'profile_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PROFILE_TABLE,
            key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
    }
}

class HealthProfile extends Model {

    static associate(models) {
        this.belongsTo(models.Profile, { as: 'profile' });
        this.belongsTo(models.PersonalPatientProfile, { as: 'personalPatientProfile' });
        this.belongsTo(models.PetPatientProfile, { as: 'petPatientProfile' });
    }e

    static config(sequelize) {
        return {
            sequelize,
            tableName: HEALTH_PROFILE,
            modelName: 'HealthProfile',
            timestamps: true
        }
    }
}

module.exports = {
    HealthProfile,
    HealthProfileSchema,
    HEALTH_PROFILE
};
