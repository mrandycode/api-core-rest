const { Model, DataTypes, Sequelize } = require('sequelize');
const { PET_OWNER_TABLE } = require('./pet-owner.model')
const PET_PATIENT_PROFILE_TABLE = 'pet_patient_profiles';

const PetPatientProfileSchema = {
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
        type: DataTypes.STRING(50),
    },
    image: {
        type: DataTypes.STRING
    },
    license: {
        type: DataTypes.STRING

    },
    birthday: {
        type: DataTypes.STRING(10)
    },
    genre: {
        type: DataTypes.STRING(1),
    },
    breed: {
        type: DataTypes.STRING(100)
    },
    color: {
        type: DataTypes.STRING(50)
    },
    age: {
        type: DataTypes.STRING(20)
    },
    reward: {
        type: DataTypes.BOOLEAN
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
    petOwnerId: {
        field: 'pet_owner_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PET_OWNER_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}

class PetPatientProfile extends Model {
    static associate(models) {
    
        this.hasMany(models.PetMedicalHistory, {
            as: 'petMedicalStories',
            foreignKey: 'petPatientProfileId'
        });

        this.hasMany(models.PreexistingDisease, {
            as: 'preexistingDiseases',
            foreignKey: 'petPatientProfileId'
        });

        this.hasMany(models.Allergy, {
            as: 'allergies',
            foreignKey: 'petPatientProfileId'
        });

        this.hasMany(models.Medication, {
            as: 'medications',
            foreignKey: 'petPatientProfileId'
        });

        this.hasMany(models.Surgery, {
            as: 'surgeries',
            foreignKey: 'petPatientProfileId'
        });

        this.hasMany(models.HealthProfile, {
            as: 'healthProfiles',
            foreignKey: 'petPatientProfileId'
        });   

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PET_PATIENT_PROFILE_TABLE,
            modelName: 'PetPatientProfile',
            timestamps: true
        }
    }
}

module.exports = {
    PET_PATIENT_PROFILE_TABLE,
    PetPatientProfileSchema,
    PetPatientProfile
}
