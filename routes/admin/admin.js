const express = require('express')
const router = express.Router()
const controllers = require('../../controllers/admin/admin')

router.post('/tambahAdmin', controllers.tambahAdmin)
router.post('/loginAdmin', controllers.loginAdmin)
router.post('/lupaPassword', controllers.lupaPass)
router.delete('/logoutAdmin', controllers.logoutAdmin)

module.exports = router