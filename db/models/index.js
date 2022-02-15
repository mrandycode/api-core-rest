const { User, UserSchema } = require('./user.model');
const { Profile, ProfileSchema } = require('./profile.model');
const { PersonalProfile, PersonalProfileSchema } = require('./personal-profile.model');
const { PetProfile, PetProfileSchema } = require('./pet-profile.model');
const { ArticleProfile, ArticleProfileSchema} = require('./article-profile.model');
const { EmergencyContact, EmergencyContactSchema } = require('./emergency-contact.model');
const { Allergy, AllergiesSchema } = require('./allergy.model');
const { Medication, MedicationSchema } = require('./medication.model');
const { PreexistingDisease, PreexistingDiseasesSchema } = require('./preexisting-disease.model');
const { ProfileType, ProfileTypeSchema } = require('./profile-type.model');
const { PinIdProfile, PinIdProfileSchema } = require('./pin-id.model');

function setupModels(sequelize) {
    User.init(UserSchema, User.config(sequelize));
    Profile.init(ProfileSchema, Profile.config(sequelize));
    PetProfile.init(PetProfileSchema, PetProfile.config(sequelize));
    ArticleProfile.init(ArticleProfileSchema, ArticleProfile.config(sequelize));
    PersonalProfile.init(PersonalProfileSchema, PersonalProfile.config(sequelize));
    EmergencyContact.init(EmergencyContactSchema, EmergencyContact.config(sequelize));
    Allergy.init(AllergiesSchema, Allergy.config(sequelize));
    Medication.init(MedicationSchema, Medication.config(sequelize));
    PreexistingDisease.init(PreexistingDiseasesSchema, PreexistingDisease.config(sequelize));
    ProfileType.init(ProfileTypeSchema, ProfileType.config(sequelize));
    PinIdProfile.init(PinIdProfileSchema, PinIdProfile.config(sequelize));

    User.associate(sequelize.models);
    Profile.associate(sequelize.models);
    PersonalProfile.associate(sequelize.models);
    PetProfile.associate(sequelize.models);
    ArticleProfile.associate(sequelize.models);
    EmergencyContact.associate(sequelize.models);
    Allergy.associate(sequelize.models);
    Medication.associate(sequelize.models);
    PreexistingDisease.associate(sequelize.models);
    ProfileType.associate(sequelize.models);
    PinIdProfile.associate(sequelize.models);
}

module.exports = setupModels;