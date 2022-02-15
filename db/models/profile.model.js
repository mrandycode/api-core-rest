const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('./user.model');
const { PROFILE_TYPE_TABLE } = require('./profile-type.model');
const PROFILE_TABLE = 'profiles';

const ProfileSchema = {
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
    qrId: {
        field: 'qr_id',
        allowNull: false,
        type: DataTypes.STRING(7)
    },
    pinId: {
        field: 'pin_id',
        allowNull: false,
        type: DataTypes.INTEGER(4)
    },
    profileType: {
        field: 'profile_type',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PROFILE_TYPE_TABLE,
            key: 'id'
        }
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
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
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: USER_TABLE,
            key: 'id'
        }
        // onUpdate: 'CASCADE',
        // onDelete: 'SET NULL'
    }
}

class Profile extends Model {

    static associate(models) {
        this.belongsTo(models.User, { as: 'user' });
        this.hasMany(models.PersonalProfile, {
            as: 'personalProfile',
            foreignKey: 'profileId'
        });
        this.hasMany(models.PetProfile, {
            as: 'petProfile',
            foreignKey: 'profileId'
        });
        this.hasMany(models.ArticleProfile, {
            as: 'articleProfile',
            foreignKey: 'profileId'
        });
        this.hasMany(models.PinIdProfile, {
            as: 'pinIdProfile',
            foreignKey: 'profileId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PROFILE_TABLE,
            modelName: 'Profile',
            timestamps: true
        }
    }
}

module.exports = { Profile, ProfileSchema, PROFILE_TABLE };
