const express = require('express')
const ProfileTypeService = require('../services/profile-types.service')
const router = express.Router()
const service = new ProfileTypeService()

router.get(
    '/',
    // passport.authenticate('jwt', { session: false }),
    // checkApiKey,
    // checkRoles('admin', 'customer'),
    async (req, res, next) => {
        try {
            res.json(await service.find())
        } catch (error) {
            next(error)
        }
    }
)

router.get(
    '/:id',
    // passport.authenticate('jwt', { session: false }),
    // checkApiKey,
    // validationHandler(getProfileTypeSchemaById),
    // checkRoles('admin', 'customer'),
    async (req, res, next) => {
        const { id } = req.params
        try {
            res.json(await service.findOne(id))
        } catch (error) {
            next(error)
        }
    }
)

module.exports = router
