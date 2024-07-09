const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/responden/responden')

router.get('/tampilPertanyaan', controllers.tampilPertanyaan)
router.post('/addPenilaian', controllers.addPenilaian)
router.post('/deteksiResponden', controllers.deteksiResponden)

module.exports = router