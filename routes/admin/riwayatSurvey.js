const express = require('express')
const router = express.Router()
const middleware = require('../../middleware/authentication')
const controllers = require('../../controllers/admin/riwayatSurvey')

router.post('/hasilKeseluruhan', middleware.verifyTokenAdmin, controllers.hasilKeseluruhan)
router.get('/allRiwayatSurvey', middleware.verifyTokenAdmin, controllers.allHasilSurvey)

module.exports = router