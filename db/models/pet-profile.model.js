const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROFILE_TABLE } = require('../models/profile.model');
const PET_PROFILE_TABLE = 'pet_profiles';

const PetProfileSchema = {
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
    license:{
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
    }
}

class PetProfile extends Model {
    static associate(models) {
        this.belongsTo(models.Profile, { as: 'profile' });
        this.hasMany(models.EmergencyContact, {
            as: 'emergencyContacts',
            foreignKey: 'petProfileId'
        });
        this.hasMany(models.PreexistingDisease, {
            as: 'preexistingDiseases',
            foreignKey: 'petProfileId'
        });
        this.hasMany(models.Allergy, {
            as: 'allergies',
            foreignKey: 'petProfileId'
        });
        this.hasMany(models.Medication, {
            as: 'medications',
            foreignKey: 'petProfileId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PET_PROFILE_TABLE,
            modelName: 'PetProfile',
            timestamps: true
        }
    }
}

module.exports = {
    PET_PROFILE_TABLE,
    PetProfileSchema,
    PetProfile
}
