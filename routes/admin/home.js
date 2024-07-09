const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/admin/home')
const middleware = require('../../middleware/authentication')


router.get('/totalResponden', middleware.verifyTokenAdmin, controllers.totalResponden)
router.get('/usiaResponden', middleware.verifyTokenAdmin, controllers.usiaResponden)
router.get('/totalPendidikan', middleware.verifyTokenAdmin, controllers.totalPendidikan)
router.get('/totalPekerjaan', middleware.verifyTokenAdmin, controllers.totalPekerjaan)

module.exports = router