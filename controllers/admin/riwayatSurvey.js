const response = require('express')
const modelPenilaian = require('../../models/penilaian')
const modelHasilSurvey = require('../../models/hasil_survey')
const modelResponden = require('../../models/responden')
const {
    Op
} = require('sequelize')
const PizZip = require("pizzip");
const Docxtemplater = require("docxtemplater");

const fs = require("fs");
const path = require("path");
let i = 1
//cari hasi penilaian keseluruhan berdasar periode
const hasilKeseluruhan = async (req, res) => {
    try {
        const {
            periodeAwal,
            periodeAkhir
        } = req.body
        const findPenilaian = await modelPenilaian.sum('hasil_akhir', {
            where: {
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })
        const totalResponden = await modelPenilaian.count({
            where: {
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })

        const findLakiLaki = await modelResponden.count({
            where: {
                jenis_kelamin: 'Laki - laki',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })

        const findPerempuan = await modelResponden.count({
            where: {
                jenis_kelamin: 'Perempuan',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })

        const findSD = await modelResponden.count({
            where: {
                jenjang_pendidikan: 'SD/SLTP',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })
        const findSLTA = await modelResponden.count({
            where: {
                jenjang_pendidikan: 'SLTA',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })
        const findDiploma = await modelResponden.count({
            where: {
                jenjang_pendidikan: 'D1/D2/D3',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })
        const findSarjana = await modelResponden.count({
            where: {
                jenjang_pendidikan: 'D4/S1',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })
        const findS2 = await modelResponden.count({
            where: {
                jenjang_pendidikan: 'S2 Keatas',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })

        const findUsia1 = await modelResponden.count({
            where: {
                usia: '15 s.d 25',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })
        const findUsia2 = await modelResponden.count({
            where: {
                usia: '26 s.d 35',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })
        const findusia3 = await modelResponden.count({
            where: {
                usia: '36 s.d 50',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })
        const findUsia4 = await modelResponden.count({
            where: {
                usia: '51 s.d 60',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })

        const findPNS = await modelResponden.count({
            where: {
                pekerjaan: 'PNS/POLRI/TNI/PPPK',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })
        const findWiraswasta = await modelResponden.count({
            where: {
                pekerjaan: 'Wiraswasta',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })
        const findSwasta = await modelResponden.count({
            where: {
                pekerjaan: 'Swasta',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })
        const findPelajar = await modelResponden.count({
            where: {
                pekerjaan: 'Pelajar/Mahasiswa',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })
        const findLainnya = await modelResponden.count({
            where: {
                pekerjaan: 'Lainnya',
                created_at: {
                    [Op.between]: [periodeAwal, periodeAkhir]
                }
            }
        })

        if (!findPenilaian || !totalResponden) {
            return res.status(400).json({
                success: false,
                message: 'Data tidak ditemukan'
            })
        }

        const findHasilSurvey = await modelHasilSurvey.findOne({
            where: {
                periode_awal: periodeAwal,
                periode_akhir: periodeAkhir
            }
        })
        if (!findHasilSurvey) {
            const content = fs.readFileSync(
                path.resolve(__dirname, '../', '../', "public", 'doc', 'template', "SKKM.docx"),
                "binary"
            );
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });
            doc.render({
                nilai_ikm: (findPenilaian / totalResponden).toFixed(2),
                jumlah_responden: totalResponden,
                periode_awal: periodeAwal,
                periode_akhir: periodeAkhir,
                laki: findLakiLaki,
                per: findPerempuan,
                sd: findSD,
                slta: findSLTA,
                d1: findDiploma,
                d4: findSarjana,
                s2: findS2,
                satu: findUsia1,
                dua: findUsia2,
                tiga: findusia3,
                em: findUsia4,
                pns: findPNS,
                wir: findWiraswasta,
                swa: findSwasta,
                pela: findPelajar,
                lain: findLainnya
            });
            const buf = doc.getZip().generate({
                type: "nodebuffer",
                compression: "DEFLATE",
            });
            fs.writeFileSync(path.resolve(__dirname, '../', '../', 'public', 'doc', 'generate', `SKKM_${periodeAwal}_${periodeAkhir}.docx`), buf);
            const filename = `SKKM_${periodeAwal}_${periodeAkhir}.docx`
            await modelHasilSurvey.create({
                id_admin: req.session.id_admin,
                nilai_akhir_survey: findPenilaian / totalResponden,
                periode_awal: periodeAwal,
                periode_akhir: periodeAkhir,
                file_skm: filename
            })
            return res.status(200).json({
                success: true,
                message: 'Data penilaian berhasil di akumulasikan'
            })
        } else {
            const content = fs.readFileSync(
                path.resolve(__dirname, '../', '../', "public", 'doc', 'template', "SKKM.docx"),
                "binary"
            );
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, {
                paragraphLoop: true,
                linebreaks: true,
            });
            doc.render({
                nilai_ikm: (findPenilaian / totalResponden).toFixed(2),
                jumlah_responden: totalResponden,
                periode_awal: periodeAwal,
                periode_akhir: periodeAkhir,
                laki: findLakiLaki,
                per: findPerempuan,
                sd: findSD,
                slta: findSLTA,
                d1: findDiploma,
                d4: findSarjana,
                s2: findS2,
                satu: findUsia1,
                dua: findUsia2,
                tiga: findusia3,
                em: findUsia4,
                pns: findPNS,
                wir: findWiraswasta,
                swa: findSwasta,
                pela: findPelajar,
                lain: findLainnya
            });
            const buf = doc.getZip().generate({
                type: "nodebuffer",
                compression: "DEFLATE",
            });

            fs.writeFileSync(path.resolve(__dirname, '../', '../', 'public', 'doc', 'generate', `SKKM_${periodeAwal}_${periodeAkhir}_${i}.docx`), buf);
            const filename = `SKKM_${periodeAwal}_${periodeAkhir}_${i}.docx`
            await modelHasilSurvey.update({
                nilai_akhir_survey: findPenilaian / totalResponden,
                file_skm: filename
            }, {
                where: {
                    id_hasil_survey: findHasilSurvey.id_hasil_survey
                }
            })
            i++
            return res.status(200).json({
                success: true,
                message: 'Data penilaian berhasil di akumulasikan'
            })
        }

    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error
        })
    }


}

//tampil seluruh hasil keseluruhan survey yang pernah tersimpan
const allHasilSurvey = async (req, res) => {
    const findAll = await modelHasilSurvey.findAll({
        attributes: ['periode_awal', 'periode_akhir', 'nilai_akhir_survey', 'file_skm']
    })
    if (findAll.length > 0) {
        return res.status(200).json({
            success: true,
            message: 'Data penilaian tersedia',
            data: findAll
        })
    } else {
        return res.status(400).json({
            success: false,
            message: 'Data penilaian belum tersedia'
        })
    }
}
module.exports = {
    hasilKeseluruhan,
    allHasilSurvey
}