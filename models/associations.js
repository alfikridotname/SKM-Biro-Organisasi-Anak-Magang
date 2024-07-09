const admin = require('./admin')
const detail_penilaian = require('./detail_penilaian')
const detail_pertanyaan = require('./detail_pertanyaan')
const hasil_survey = require('./hasil_survey')
const penilaian = require('./penilaian')
const pertanyaan = require('./pertanyaan')
const responden = require('./responden')
const saran = require('./saran')


admin.hasMany(hasil_survey, {foreignKey: 'id_admin'})
hasil_survey.belongsTo(admin, {foreignKey: 'id_admin'})

responden.hasMany(penilaian, {foreignKey: 'id_penilaian'})
penilaian.belongsTo(responden, {foreignKey: 'id_responden'})
// responden.hasMany(saran, {foreignKey: 'id_responden'})
// saran.belongsTo(responden, {foreignKey: 'id_responden'})

// penilaian.hasMany(detail_penilaian, {foreignKey: 'id_penilaian'})
// detail_penilaian.belongsTo(penilaian, {foreignKey: 'id_penilaian'})

// pertanyaan.hasMany(detail_pertanyaan, { foreignKey: 'id_pertanyaan', as: 'dataDetailPertanyaan'});
// detail_pertanyaan.belongsTo(pertanyaan, { foreignKey: 'id_pertanyaan', as: 'dataPertanyaan'})

// pertanyaan.hasMany(detail_penilaian, {foreignKey: 'id_pertanyaan'})
// detail_penilaian.belongsTo(pertanyaan, {foreignKey: 'id_pertanyaan'})
