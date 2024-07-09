const modelPertanyaan = require('../../models/pertanyaan')
const modelDetailPertanyaan = require('../../models/detail_pertanyaan')

//tambah pertanyaan
const tambahPertanyaan = async (req,res) => {
    try {
        const {pertanyaan} = req.body
        if (!pertanyaan) {
            return res.status(400).json({success:false, message: 'silahkan isi pertanyaan'})
        }
        await modelPertanyaan.create({
            teks_pertanyaan: pertanyaan
        })
        return res.status(200).json({success:true, message: 'Pertanyaan berhasil ditambahkan'})        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:error})
    }    
}

//tambah detail pertanyaan
const tambahDetail = async (req,res) => {
    try {
        const{id_pertanyaan} = req.params
        const{pilihan_kriteria, nilai_pilihan} = req.body
        await modelDetailPertanyaan.create({
            pilihan_kriteria: pilihan_kriteria,
            nilai_pilihan: nilai_pilihan,
            id_pertanyaan: id_pertanyaan
        })       
        return res.status(200).json({success:true, message: 'Detail pertanyaan berhasil ditambahkan'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message: error})
    }
}


module.exports = {tambahPertanyaan, tambahDetail}