const express = require('express')
const router = express.Router()
const middleware = require('../../middleware/authentication')
const controllers = require('../../controllers/admin/hasilSurvey')

router.post('/tampilHasilSurvey', middleware.verifyTokenAdmin, controllers.cariNilaiPribadi)
router.get('/detailHasilSurvey/:id_penilaian', middleware.verifyTokenAdmin, controllers.getDetail)

module.exports = router