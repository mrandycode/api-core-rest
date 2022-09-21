const express = require('express');
const profileRouter = require('./profile.router');
const profileTypeRouter = require('./profile-type.router');
const personalProfileRouter = require('./personal-profile.router');
const doctorProfileRouter = require('./health/doctor-profile.router');
const petProfileRouter = require('./pet-profile.router');
const personalPatientProfileRouter = require('./health/personal-patient-profile.router');
const personalMedicalHistoryRouter = require('./health/personal-medical-history.router');
const petPatientProfileRouter = require('./health/pet-patient-profile.router');
const petMedicaHistoryRouter = require('./health/pet-medical-history.router');
const petOwnerRouter = require('./health/pet-owner.router');
const surgeryRouter = require('./health/surgery.router');
const surgeryHeadRouter = require('./health/surgery-head.router');
const articleProfileRouter = require('./article-profile.router');
const emergencyContactRouter = require('./emergency-contact.router');
const preexistingDiseaseRouter = require('./preexisting-diseases.router');
const medicationRouter = require('./medication.router');
const allergyRouter = require('./allergy.router');
const userRouter = require('./user.router');
const pinIdRouter = require('./pin-id.router');
const scanmeRouter = require('./scanme.router');

function routerApi(app) {
    const router = express.Router();
    app.use('/api-core-rest', router);
    router.use('/profile', profileRouter);
    router.use('/profile-type', profileTypeRouter);
    router.use('/personal-profile', personalProfileRouter);
    router.use('/doctor-profile', doctorProfileRouter);
    router.use('/pet-profile', petProfileRouter);
    router.use('/personal-patient-profile', personalPatientProfileRouter);
    router.use('/personal-medical-history', personalMedicalHistoryRouter);
    router.use('/pet-patient-profile', petPatientProfileRouter);
    router.use('/pet-medical-history', petMedicaHistoryRouter);
    router.use('/pet-owner', petOwnerRouter);
    router.use('/surgery', surgeryRouter);
    router.use('/surgery-head', surgeryHeadRouter);
    router.use('/article-profile', articleProfileRouter);
    router.use('/emergency-contact', emergencyContactRouter);
    router.use('/preexisting-disease', preexistingDiseaseRouter);
    router.use('/medication', medicationRouter);
    router.use('/allergy', allergyRouter);
    router.use('/user', userRouter);
    router.use('/pin-id', pinIdRouter);
    router.use('/scan-me', scanmeRouter);
}

module.exports = routerApi;
