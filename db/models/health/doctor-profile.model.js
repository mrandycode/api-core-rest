const { Model, DataTypes, Sequelize } = require('sequelize');
const { USER_TABLE } = require('../user.model');
const DOCTOR_PROFILE_TABLE = 'doctor_profiles';

const DoctorProfileSchema = {
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
    medicalRegisterA: {
        type: DataTypes.STRING(20),
        field: 'medical_register_a',
    },
    medicalRegisterB: {
        type: DataTypes.STRING(20),
        field: 'medical_register_b',
    },
    medicalRegisterC: {
        type: DataTypes.STRING(20),
        field: 'medical_register_c',
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
    qtyQrGiven: {
        field: 'qty_qr_given',
        type: DataTypes.INTEGER(10),
    },
    specialty: {
        field: 'specialty',
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
    userId: {
        field: 'user_id',
        allowNull: false,
        type: DataTypes.INTEGER,
        unique: true,
        references: {
            model: USER_TABLE,
            key: 'id'
        }
    }
}

class DoctorProfile extends Model {
    static associate(models) {
        this.belongsTo(models.User, { as: 'user' });
        // this.hasMany(models.HealthProfile, {
        //     as: 'healthProfiles',
        //     foreignKey: 'personalPatientProfileId'
        // });       

    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: DOCTOR_PROFILE_TABLE,
            modelName: 'DoctorProfile',
            timestamps: true
        }
    }
}

module.exports = {
    DOCTOR_PROFILE_TABLE,
    DoctorProfileSchema,
    DoctorProfile
}
