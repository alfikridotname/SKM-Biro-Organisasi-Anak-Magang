const homeAdmin = require('./admin/home')
const admin = require('./admin/admin')
const penilaianResponden = require('./admin/penilaian')
const routeResponden = require('./responden/responden')
const hasilSurvey = require('./admin/hasilSurvey')
const riwayatSurvey = require('./admin/riwayatSurvey')
const profile = require('./admin/profile')
const view = require('./viewWeb/view')
const server = {}

server.homeAdmin = homeAdmin
server.admin = admin
server.penilaianResponden = penilaianResponden
server.routeResponden = routeResponden
server.hasilSurvey = hasilSurvey
server.riwayatSurvey = riwayatSurvey
server.profile = profile
server.view = view


module.exports = server