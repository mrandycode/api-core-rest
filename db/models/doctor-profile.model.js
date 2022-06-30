const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROFILE_TABLE } = require('../models/profile.model');
const PERSONAL_PROFILE_TABLE = 'personal_profiles';

const PersonalProfileSchema = {
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
    vaccineCovid: {
        type: DataTypes.STRING(20),
        field: 'vaccine_covid'
    },
    doseQtyCovid: {
        type: DataTypes.STRING(20),
        field: 'dose_qty_covid'
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
        },
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE'
    }
}

class PersonalProfile extends Model {
    static associate(models) {
        this.belongsTo(models.Profile, { as: 'profile' });
        this.hasMany(models.EmergencyContact, {
            as: 'emergencyContacts',
            foreignKey: 'personalProfileId'
        });
        this.hasMany(models.PreexistingDisease, {
            as: 'preexistingDiseases',
            foreignKey: 'personalProfileId'
        });
        this.hasMany(models.Allergy, {
            as: 'allergies',
            foreignKey: 'personalProfileId'
        });
        this.hasMany(models.Medication, {
            as: 'medications',
            foreignKey: 'personalProfileId'
        });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PERSONAL_PROFILE_TABLE,
            modelName: 'PersonalProfile',
            timestamps: true
        }
    }
}

module.exports = {
    PERSONAL_PROFILE_TABLE,
    PersonalProfileSchema,
    PersonalProfile
}
