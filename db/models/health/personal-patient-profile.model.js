const { Model, DataTypes, Sequelize } = require('sequelize');
const PERSONAL_PATIENT_PROFILE_TABLE = 'personal_patient_profiles';

const PersonalPatientProfileSchema = {
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
    lastName: {
        allowNull: false,
        type: DataTypes.STRING(100),
        field: 'last_name',
    },
    image: {
        type: DataTypes.STRING
    },
    birthday: {
        allowNull: false,
        type: DataTypes.STRING(10)
    },
    genre: {
        type: DataTypes.STRING(1),
    },
    bloodType: {
        type: DataTypes.STRING(20),
        field: 'blood_type',
    },
    eyeColor: {
        type: DataTypes.STRING(20),
        field: 'eye_color',
    },
    mobile: {
        type: DataTypes.STRING(50),
    },
    phone: {
        type: DataTypes.STRING(50),
    },
    email: {
        type: DataTypes.STRING(64),
        isEmail: true,
    },
    city: {
        type: DataTypes.STRING(100),
    },
    state: {
        type: DataTypes.STRING(100),
    },
    zip: {
        type: DataTypes.STRING(10),
    },
    address: {
        type: DataTypes.STRING(1000),
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

class PersonalPatientProfile extends Model {
    static associate(models) {

        this.hasMany(models.PersonalMedicalHistory, {
            as: 'personalMedicalHistory',
            foreignKey: 'personalPatientProfileId'
        });
        
        this.hasMany(models.PreexistingDisease, {
            as: 'preexistingDiseases',
            foreignKey: 'personalPatientProfileId'
        });

        this.hasMany(models.Allergy, {
            as: 'allergies',
            foreignKey: 'personalPatientProfileId'
        });

        this.hasMany(models.Medication, {
            as: 'medications',
            foreignKey: 'personalPatientProfileId'
        });

        this.hasMany(models.Surgery, {
            as: 'surgeries',
            foreignKey: 'personalPatientProfileId'
        });


    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PERSONAL_PATIENT_PROFILE_TABLE,
            modelName: 'PersonalPatientProfile',
            timestamps: true
        }
    }
}

module.exports = {
    PERSONAL_PATIENT_PROFILE_TABLE,
    PersonalPatientProfileSchema,
    PersonalPatientProfile
}
