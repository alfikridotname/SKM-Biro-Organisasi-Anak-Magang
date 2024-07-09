const response = require('express')
const modelResponden = require('../../models/responden')
const modelPenilaian = require('../../models/penilaian')
const modelDetailPenilaian = require('../../models/detail_penilaian')
const modelPertanyaan = require('../../models/pertanyaan')
const modelDetailPertanyaan = require('../../models/detail_pertanyaan')
const modelSaran = require('../../models/saran')
const {Op, Sequelize} = require('sequelize')

//pencarian penilaian (tampil nilai pribadi)
const cariNilaiPribadi = async (req,res) => {
    try {
        const {periodeAwal, periodeAkhir} = req.body
        if (!periodeAwal || !periodeAkhir) {
            return res.status(400).json({success:false, message: 'Silahkan isi periode yang diinginkan terlebih dahulu'})
        }
        const findData = await modelPenilaian.findAll({
            where: {
                created_at:{
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            },
            include:[
                {
                    model: modelResponden,
                    as: 'dataResponden',
                    attributes: ['email', 'jenis_kelamin', 'usia', 'jenjang_pendidikan', 'pekerjaan']
                }
            ],
            attributes: ['hasil_akhir', 'id_penilaian']
        })
        if (!findData) {
            return res.status(400).json({success: false, message: 'Data tidak ditemukan'})
        }
        return res.status(200).json({success:true, message:'Data ditemukan', data: findData})        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: error})
    }
    
}

//data detail masing-masing penilaian
const getDetail = async (req,res) => {
    try {
        const {id_penilaian} = req.params
        const dataDetail = await modelDetailPenilaian.findAll({
            where: {
                id_penilaian: id_penilaian
            },
            include: [
                {
                    model: modelPertanyaan,
                    as: 'dataPertanyaan',
                    attributes: ['teks_pertanyaan'],
                    
                },
                {
                    model: modelPenilaian,
                    as: 'dataPenilaian',
                    attributes: ['id_responden'],
                    include: [
                        {
                            model: modelResponden,
                            as: 'dataResponden',
                            attributes: ['nama'],
                            include: [
                                {
                                    model: modelSaran,
                                    as: 'dataSaran',
                                    attributes: ['saran_teks']
                                }
                            ],
                            
                        }
                    ]
                }
            ],
            attributes: ['nilai_pertanyaan']
        });
        
        if (dataDetail.length > 0) {
            return res.status(200).json({success:true, message: 'Data detail penilaian ditemukan', data: dataDetail})
        } else {
            return res.status(400).json({success:false, message: 'Data detail tidak ditemukan'})
        }        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: error})
    }
    
}

module.exports = {cariNilaiPribadi, getDetail}