const { Model, DataTypes, Sequelize } = require('sequelize');
const PET_MEDICAL_STORIES_TABLE = 'pet_medical_stories';
const PET_PATIENT_TABLE = require('./pet-patient-profile.model');
const USER_TABLE = require('./../user.model');

const PetMedicalHistorySchema = {
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
    appointmentDate: {
        allowNull: false,
        type: DataTypes.DATE,
        field: 'appointment_date',
    },
    reasonId: {
        allowNull: false,
        type: DataTypes.INTEGER,
        field: 'reason_id',
    },
    reasonDescription: {
        allowNull: false,
        type: DataTypes.STRING(2000),
        field: 'reason_description',
    },
    treatment: {
        allowNull: false,
        type: DataTypes.STRING(2000),
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
    petPatientProfileId: {
        field: 'pet_patient_profile_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PET_PATIENT_TABLE,
            key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
    },
    userId: {
        field: 'user_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: USER_TABLE,
            key: 'id'
        },
        // onUpdate: 'CASCADE',
        // onDelete: 'CASCADE'
    }
}

class PetMedicalHistory extends Model {

    static associate(models) {
        this.belongsTo(models.PetPatientProfile, { as: 'petPatientProfile' });
        this.belongsTo(models.User, { as: 'user' });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PET_MEDICAL_STORIES_TABLE,
            modelName: 'PetMedicalHistory',
            timestamps: true
        }
    }

}

module.exports = {
    PET_MEDICAL_STORIES_TABLE,
    PetMedicalHistorySchema,
    PetMedicalHistory
} 