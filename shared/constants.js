module.exports = Object.freeze({
    PERSONAL_PROFILE: [
        'emergencyContacts',
        'preexistingDiseases',
        'allergies',
        'medications'],
    PET_PROFILE: [
        'emergencyContacts',
        'preexistingDiseases',
        'allergies',
        'medications'],
    ARTICLE_PROFILE: ['emergencyContacts'],
    EMERGENCY_CONTACTS: [
        'personalProfile',
        'petProfile',
        'articleProfile'],
});