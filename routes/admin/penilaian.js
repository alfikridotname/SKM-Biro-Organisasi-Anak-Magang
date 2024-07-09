const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/admin/penilaian')
const middleware = require('../../middleware/authentication')

router.post('/tambahPertanyaan', middleware.verifyTokenAdmin, controllers.tambahPertanyaan)
router.post('/tambahDetailPertanyaan/:id_pertanyaan', middleware.verifyTokenAdmin, controllers.tambahDetail)

module.exports = router