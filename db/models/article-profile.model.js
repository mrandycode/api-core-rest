const { Model, DataTypes, Sequelize } = require('sequelize');
const { PROFILE_TABLE } = require('../models/profile.model');
const ARTICLE_PROFILE_TABLE = 'article_profiles';

const ArticleProfileSchema = {
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
    brand: {
        type: DataTypes.STRING(50),
    },
    model: {
        type: DataTypes.STRING(50),
    },
    type: {
        type: DataTypes.STRING(20),
    },
    serial: {
        type: DataTypes.STRING(20),
    },
    image: {
        type: DataTypes.STRING
    },
    color: {
        type: DataTypes.STRING(50)
    },
    reward: {
        type: DataTypes.BOOLEAN
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

class ArticleProfile extends Model {
    static associate(models) {
        this.belongsTo(models.Profile, { as: 'profile' });
        this.hasMany(models.EmergencyContact, {
            as: 'emergencyContacts',
            foreignKey: 'articleProfileId'
        });
        
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: ARTICLE_PROFILE_TABLE,
            modelName: 'ArticleProfile',
            timestamps: true
        }
    }
}


module.exports = {
    ARTICLE_PROFILE_TABLE,
    ArticleProfileSchema,
    ArticleProfile
}
