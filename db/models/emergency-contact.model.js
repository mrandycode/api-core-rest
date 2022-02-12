const { Model, DataTypes, Sequelize } = require('sequelize');
const { PRESONAL_PROFILE_TABLE } = require('../models/personal-profile.model');
const { PET_PROFILE_TABLE } = require('../models/pet-profile.model');
const EMERGENCY_CONTACTS_TABLE = 'emergency_contacts';

const EmergencyContactSchema = {
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
    fullName: {
        field: 'full_name',
        allowNull: false,
        type: DataTypes.STRING(100)
    },
    relationship: {
        allowNull: false,
        type: DataTypes.STRING(50)
    },
    mobile: {
        allowNull: false,
        type: DataTypes.STRING(50),
    },
    phone: {
        type: DataTypes.STRING(50),
    },
    address: {
        type: DataTypes.STRING(1000),
    },
    email: {
        type: DataTypes.STRING(64),
        isEmail: true,
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
            model: PRESONAL_PROFILE_TABLE,
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
    articleProfileId: {
        field: 'article_profile_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PET_PROFILE_TABLE,
            key: 'id'
        }
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
    }
}

class EmergencyContact extends Model {
    
    static associate(models) {
        this.belongsTo(models.PersonalProfile, { as: 'personalProfile' });
        this.belongsTo(models.PetProfile, { as: 'petProfile' });
        this.belongsTo(models.ArticleProfile, { as: 'articleProfile' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: EMERGENCY_CONTACTS_TABLE,
            modelName: 'EmergencyContact',
            timestamps: true
        }
    }
}

module.exports = {
    EmergencyContact,
    EmergencyContactSchema,
    EMERGENCY_CONTACTS_TABLE
};
