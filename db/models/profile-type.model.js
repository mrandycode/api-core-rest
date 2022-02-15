const { Model, DataTypes, Sequelize } = require('sequelize');
const PROFILE_TYPE_TABLE = 'profile_types';

const ProfileTypeSchema = {
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
    status: {
        allowNull: false,
        type: DataTypes.INTEGER(1),
        defaultValue: 1,
        comment: '1 (Active) - 2 (Inactive)'
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

class ProfileType extends Model {
    static associate(models) {
        this.hasMany(models.Profile, {
            as: 'profile',
            foreignKey: 'userId'
        });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PROFILE_TYPE_TABLE,
            modelName: 'ProfileType',
            timestamps: true
        }
    }
}


module.exports = {
    PROFILE_TYPE_TABLE,
    ProfileTypeSchema,
    ProfileType
}
