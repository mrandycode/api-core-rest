const { Model, DataTypes, Sequelize } = require('sequelize');
const PET_OWNERS_TABLE = 'pet_owners';

const PetOwnerSchema = {
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
    dni: {
        allowNull: false,
        type: DataTypes.STRING(20),
        unique: true
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

class PetOwner extends Model {
    static associate(models) {
        this.hasMany(models.PetPatientProfile, {
            as: 'petPatientProfiles',
            foreignKey: 'petOwnerId'
        });

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: PET_OWNERS_TABLE,
            modelName: 'PetOwner',
            timestamps: true
        }
    }
}

module.exports = {
    PET_OWNERS_TABLE,
    PetOwnerSchema,
    PetOwner
}
