const { Model, DataTypes, Sequelize } = require('sequelize');
const PERSON_MEDICAL_STORIES_TABLE = 'personal_medical_stories';
const PERSONAL_PATIENT_TABLE = require('./personal-patient-profile.model');

const PersonalMedicalHistorySchema = {
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
    personalPatientProfileId: {
        field: 'personal_patient_profile_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PERSONAL_PATIENT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}

class PersonalMedicalHistory extends Model {

    static associate(models) {
        this.belongsTo(models.PersonalPatientProfile, { as: 'personalPatientProfile' });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PERSON_MEDICAL_STORIES_TABLE,
            modelName: 'PersonalMedicalHistory',
            timestamps: true
        }
    }

}

module.exports = {
    PERSON_MEDICAL_STORIES_TABLE,
    PersonalMedicalHistorySchema,
    PersonalMedicalHistory
}