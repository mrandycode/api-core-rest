const { Model, DataTypes, Sequelize } = require('sequelize');
const PERSONAL_PATIENT_TABLE = require('./personal-patient-profile.model');
const SURGERIES_TABLE = 'surgeries';

const SurgerySchema = {
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
    personalPatientProfileId: {
        field: 'personal_patient_profile_id',
        type: DataTypes.INTEGER,
        unique: false,
        references: {
            model: PERSONAL_PATIENT_TABLE,
            key: 'id'
        },
        onUpdate: 'CASCADE',
        onDelete: 'SET NULL'
    }
}

class Surgery extends Model {
    static associate(models) {
        this.belongsTo(models.PersonalPatientProfile,
            { as: 'personalPatientProfile' });
    }

    static config(sequelize) {
        return {
            sequelize,
            tableName: SURGERIES_TABLE,
            modelName: 'Surgery',
            timestamps: true
        }
    }
}

module.exports = {
    SURGERIES_TABLE,
    SurgerySchema,
    Surgery
}
