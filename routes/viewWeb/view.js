const express = require('express')
const router = express.Router()
const controller = require('../../controllers/viewsWeb/views')
const middleware = require('../../middleware/authentication')

router.get('/', controller.viewsSkm) 
router.get('/login', controller.viewsLogin)
router.get('/changepass', controller.viewsChangePass)
router.get('/forgotpass', controller.viewsForgotPass)
router.get('/biodata', controller.viewsBiodata)
router.get('/kuisioner', controller.viewsKuisioner)
router.get('/aspirasiSaran', controller.viewsAspirasiSaran)
router.get('/thankyou', controller.viewsThankyou)
router.get('/dashboard', middleware.verifyTokenAdmin, controller.viewsDashboard)
router.get('/hasilSurvey', middleware.verifyTokenAdmin, controller.viewsHasilSurvey)
router.get('/riwayatSurvey', middleware.verifyTokenAdmin, controller.viewsRiwayatSurvey)
router.get('/profile', middleware.verifyTokenAdmin, controller.viewsProfile)

module.exports = router