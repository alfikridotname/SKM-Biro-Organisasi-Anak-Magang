const express = require('express')
const router = express.Router()
const middleware = require('../../middleware/authentication')
const controllers = require('../../controllers/admin/profile')

router.get('/dataProfile', middleware.verifyTokenAdmin, controllers.dataProfile)
router.get('/logout', middleware.verifyTokenAdmin, controllers.logout)
router.post('/updateProfile', middleware.verifyTokenAdmin, controllers.uploadd, controllers.updateProfile)

module.exports =router
