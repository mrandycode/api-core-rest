const { Model, DataTypes, Sequelize } = require('sequelize');
const { PERSONAL_PROFILE_TABLE } = require('../models/personal-profile.model');
const { PET_PROFILE_TABLE } = require('../models/pet-profile.model');
const PERSONAL_PATIENT_TABLE = require('./health/personal-patient-profile.model');
const MEDICATIONS_TABLE = 'medications';

const MedicationSchema = {
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
        field: 'full_name',
        allowNull: false,
        type: DataTypes.STRING(100)
    },
    frecuency: {
        allowNull: false,
        type: DataTypes.STRING(200)
    },
    dose: {
        allowNull: false,
        type: DataTypes.STRING(50),
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
    personalProfileId: {
        field: 'personal_profile_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PERSONAL_PROFILE_TABLE,
            key: 'id'
        }
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
    },
    petProfileId: {
        field: 'pet_profile_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PET_PROFILE_TABLE,
            key: 'id'
        }
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
    },
    personalPatientProfileId: {
        field: 'personal_patient_profile_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PERSONAL_PATIENT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Medication extends Model {

    static associate(models) {
        this.belongsTo(models.PersonalProfile, { as: 'personal_profile' });
        this.belongsTo(models.PetProfile, { as: 'petProfile' });
        this.belongsTo(models.PersonalPatientProfile, { as: 'personalPatientProfile' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: MEDICATIONS_TABLE,
            modelName: 'Medication',
            timestamps: true
        }
    }
}

module.exports = { 
    Medication, 
    MedicationSchema, 
    MEDICATIONS_TABLE };
