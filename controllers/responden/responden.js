const modelPertanyaan = require('../../models/pertanyaan')
const modelDetailPertanyaan = require('../../models/detail_pertanyaan')
const modelResponden = require('../../models/responden')
const modelPenilaian = require('../../models/penilaian')
const modelDetailPenilaian = require('../../models/detail_penilaian')
const modelSaran = require('../../models/saran')
const nodemailer = require('nodemailer')
const smtpTransport = require('nodemailer-smtp-transport');


//tampil pertanyaan dan detail pertanyaan
const tampilPertanyaan = async (req,res) => {
    try {
        const findPertanyaan = await modelPertanyaan.findAll({
            include: [
                {
                    model: modelDetailPertanyaan,
                    as: 'dataDetailPertanyaan',
                    attributes: ['pilihan_kriteria', 'nilai_pilihan']
                    
                }
            ],
            attributes: ['id_pertanyaan', 'teks_pertanyaan']
        })
        if (findPertanyaan.length > 0) {
            return res.status(200).json({success:true, message: 'Data pertanyaan tersedia', data: findPertanyaan})
        } else {
            return res.status(400).json({success:false, message:'Data pertanyaan belum tersedia'})
        }
        
    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: error})
    }
}

const transporter = nodemailer.createTransport({
    service: 'gmail', 
    auth: {
        user: process.env.email_owner, 
        pass: process.env.password_owner 
    },
    tls: {
        rejectUnauthorized: false
    }
});

//penilaian
const addPenilaian = async (req,res) => {
    try {
        const {nama, email, jenis_kelamin, usia, pekerjaan, jenjang_pendidikan, dataPenilaian, saran} = req.body 
        
        if (!nama || !email ||  !jenis_kelamin || !usia || !pekerjaan || !jenjang_pendidikan) {
            return res.status(400).json({success:false, message: 'Lengkapi data diri anda'})
        }

        let penilaian = {}

        if (!dataPenilaian) {
            return res.status(400).json({success:false, message: 'Tambahkan data penilaian'})
        }
        if (!Array.isArray(dataPenilaian)) {
            return res.status(400).json({success:false, message: 'Data penilaian harus dalam bentu array'})
        }

        const date = new Date()
        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const tanggal = `${year}-${month}-${day}`;
        let konfirmTanggal
        let konfirmCreated

        const semester1 = ['01','02','03', '04', '05', '06']
        const semester2 = ['07', '08', '09', '10', '11', '12']
        const findTanggal = semester1.find(item => item === month);
        if (findTanggal == month) {
            konfirmTanggal = true
        } else {
            konfirmTanggal = false
        }
        console.log(konfirmTanggal)

        const findEmail = await modelResponden.findOne({where:{email:email}})
        if (findEmail) {
            const created_at = findEmail.created_at; 
            const month = created_at.substring(5, 7);
            const findMonth = semester1.find(item => item === month)
            if (findMonth != undefined) {
                konfirmCreated = true
            } else {
                konfirmCreated = false
            }
            
            if (konfirmTanggal && konfirmCreated) {
                return res.status(400).json({success:false, message: 'Anda sudah mengisi survey pada periode yang sama'})
            } else {
                const addResponden = await modelResponden.create({
                    nama: nama,
                    email: email,
                    jenis_kelamin: jenis_kelamin,
                    usia: usia,
                    pekerjaan: pekerjaan,
                    jenjang_pendidikan:jenjang_pendidikan
                })
                const id_responden = addResponden.id_responden

                const tambahPenilaian = await modelPenilaian.create({id_responden:id_responden})
                const id_penilaian = tambahPenilaian.id_penilaian

                for (const item of dataPenilaian) {
                    const{id_pertanyaan, nilai_pertanyaan} = item

                    if (!penilaian[id_pertanyaan]) {
                        penilaian[id_pertanyaan] = {
                            nilai_pertanyaan: 0
                        }
                    }
                    
                    penilaian[id_pertanyaan].nilai_pertanyaan += nilai_pertanyaan


                    const tambahDetail = await modelDetailPenilaian.create({
                        id_penilaian: id_penilaian,
                        id_pertanyaan: id_pertanyaan,
                        nilai_pertanyaan: penilaian[id_pertanyaan].nilai_pertanyaan,
                        NNR: penilaian[id_pertanyaan].nilai_pertanyaan * 0.11
                    })


                }

                if (!saran) {

                    const mailOptions = {
                        from: process.env.email_owner,
                        to: email, 
                        subject: "SURVEY KEPUASAN MASYARAKAT BIRO ORGANISASI",
                        text: "Terima kasih banyak atas partisipasi Anda dalam mengisi Survey Kepuasan Masyarakat (SKM) kami! ✨ Pendapat dan pengalaman Anda sangat berarti bagi kami. Tim kami telah menerima tanggapan Anda dengan baik.Kami sangat menghargai waktu dan upaya yang Anda luangkan untuk berbagi pandangan Anda.Pesan Anda akan membantu kami meningkatkan pelayanan kami lebih baik lagi dan  menciptakan perubahan positif . "
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                          console.log(error);
                          return res.status(400).json({success:true, message:'Penilaian gagal ditambahkan'})   
                        } else {
                          console.log('Email sent: ' + info.response);
                          return res.status(200).json({success:true, message:'Penilaian berhasil ditambahkan, silahkan cek email anda'}) 
                        }
                      });
                } else {
                    await modelSaran.create({id_responden: id_responden, saran_teks:saran})
                    
                    const mailOptions = {
                        from: process.env.email_owner,
                        to: email, 
                        subject: "SURVEY KEPUASAN MASYARAKAT BIRO ORGANISASI",
                        text: "Terima kasih banyak atas partisipasi Anda dalam mengisi Survey Kepuasan Masyarakat (SKM) kami! ✨ Pendapat dan pengalaman Anda sangat berarti bagi kami. Tim kami telah menerima tanggapan Anda dengan baik.Kami sangat menghargai waktu dan upaya yang Anda luangkan untuk berbagi pandangan Anda.Pesan Anda akan membantu kami meningkatkan pelayanan kami lebih baik lagi dan  menciptakan perubahan positif . "
                    };

                    transporter.sendMail(mailOptions, (error, info) => {
                        if (error) {
                          console.log(error);
                          return res.status(400).json({success:true, message:'Penilaian gagal ditambahkan'})   
                        } else {
                          console.log('Email sent: ' + info.response);
                          return res.status(200).json({success:true, message:'Penilaian berhasil ditambahkan, silahkan cek email anda'}) 
                        }
                      });
                }     
            }
        } else {
            const addResponden = await modelResponden.create({
                nama: nama,
                email: email,
                jenis_kelamin: jenis_kelamin,
                usia: usia,
                pekerjaan: pekerjaan,
                jenjang_pendidikan:jenjang_pendidikan
            })
            const id_responden = addResponden.id_responden

            const tambahPenilaian = await modelPenilaian.create({id_responden:id_responden})
            const id_penilaian = tambahPenilaian.id_penilaian

            for (const item of dataPenilaian) {
                const{id_pertanyaan, nilai_pertanyaan} = item

                if (!penilaian[id_pertanyaan]) {
                    penilaian[id_pertanyaan] = {
                        nilai_pertanyaan: 0
                    }
                }
                
                penilaian[id_pertanyaan].nilai_pertanyaan += nilai_pertanyaan


                const tambahDetail = await modelDetailPenilaian.create({
                    id_penilaian: id_penilaian,
                    id_pertanyaan: id_pertanyaan,
                    nilai_pertanyaan: penilaian[id_pertanyaan].nilai_pertanyaan,
                    NNR: penilaian[id_pertanyaan].nilai_pertanyaan * 0.11
                })
            }

            const findDetailPenilain = await modelDetailPenilaian.sum('NNR', {
                where:{
                    id_penilaian: id_penilaian
                }
            })

            await modelPenilaian.update({
                hasil_akhir: findDetailPenilain*25
            }, {
                where:{
                    id_penilaian: id_penilaian
                }
            })

            if (!saran) {
                   
                const mailOptions = {
                    from: process.env.email_owner,
                    to: email, 
                    subject: "SURVEY KEPUASAN MASYARAKAT BIRO ORGANISASI",
                    text: "Terima kasih banyak atas partisipasi Anda dalam mengisi Survey Kepuasan Masyarakat (SKM) kami! ✨ Pendapat dan pengalaman Anda sangat berarti bagi kami. Tim kami telah menerima tanggapan Anda dengan baik.Kami sangat menghargai waktu dan upaya yang Anda luangkan untuk berbagi pandangan Anda.Pesan Anda akan membantu kami meningkatkan pelayanan kami lebih baik lagi dan  menciptakan perubahan positif . "
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.log(error);
                      return res.status(400).json({success:true, message:'Penilaian gagal ditambahkan'})   
                    } else {
                      console.log('Email sent: ' + info.response);
                      return res.status(200).json({success:true, message:'Penilaian berhasil ditambahkan, silahkan cek email anda'}) 
                    }
                  });        
            } else {
                await modelSaran.create({id_responden: id_responden, saran_teks:saran})
            
                const mailOptions = {
                    from: process.env.email_owner,
                    to: email, 
                    subject: "SURVEY KEPUASAN MASYARAKAT BIRO ORGANISASI",
                    text: "Terima kasih banyak atas partisipasi Anda dalam mengisi Survey Kepuasan Masyarakat (SKM) kami! ✨ Pendapat dan pengalaman Anda sangat berarti bagi kami. Tim kami telah menerima tanggapan Anda dengan baik.Kami sangat menghargai waktu dan upaya yang Anda luangkan untuk berbagi pandangan Anda.Pesan Anda akan membantu kami meningkatkan pelayanan kami lebih baik lagi dan  menciptakan perubahan positif . "
                };

                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                      console.log(error);
                      return res.status(400).json({success:true, message:'Penilaian gagal ditambahkan'})   
                    } else {
                      console.log('Email sent: ' + info.response);
                      return res.status(200).json({success:true, message:'Penilaian berhasil ditambahkan, silahkan cek email anda'}) 
                    }
                  });
            }                 
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: error})
    }
}

const deteksiResponden = async (req,res) => {
    try {
        const {nama, email, jenis_kelamin, usia, pekerjaan, jenjang_pendidikan} = req.body 
        
        if (!nama || !email ||  !jenis_kelamin || !usia || !pekerjaan || !jenjang_pendidikan) {
            return res.status(400).json({success:false, message: 'Lengkapi data diri anda'})
        }

        const date = new Date()
        const day = date.getDate().toString().padStart(2, '0'); 
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear();
        const tanggal = `${year}-${month}-${day}`;
        let konfirmTanggal
        let konfirmCreated

        const semester1 = ['01','02','03', '04', '05', '06']
        const semester2 = ['07', '08', '09', '10', '11', '12']
        const findTanggal = semester1.find(item => item === month);
        if (findTanggal == month) {
            konfirmTanggal = true
        } else {
            konfirmTanggal = false
        }
        console.log(konfirmTanggal)

        const findEmail = await modelResponden.findOne({where:{email:email}})
        if (findEmail) {
            const created_at = findEmail.created_at; 
            const month = created_at.substring(5, 7);
            const findMonth = semester1.find(item => item === month)
            if (findMonth != undefined) {
                konfirmCreated = true
            } else {
                konfirmCreated = false
            }
            
            if (konfirmTanggal && konfirmCreated) {
                return res.status(400).json({success:false, message: 'Anda sudah mengisi survey pada periode yang sama'})
            } else {
                return res.status(200).json({
                    success: true,
                    message: 'Anda dapat mengisi survey',
                    data: {
                        'nama': nama,
                        'email': email,
                        'jenis_kelamin': jenis_kelamin,
                        'usia': usia,
                        'pekerjaan': pekerjaan,
                        'jenjang_pendidikan': jenjang_pendidikan
                    }
                })
            }
        } else {
            return res.status(200).json({
                success: true,
                message: 'Anda dapat mengisi survey',
                data: {
                    'nama': nama,
                    'email': email,
                    'jenis_kelamin': jenis_kelamin,
                    'usia': usia,
                    'pekerjaan': pekerjaan,
                    'jenjang_pendidikan': jenjang_pendidikan
                }
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({success:false, message: error})
    }
}


module.exports = {tampilPertanyaan, addPenilaian, deteksiResponden}