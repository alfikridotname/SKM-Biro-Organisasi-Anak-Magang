const response = require('express')
const modelResponden = require('../../models/responden')
const {Op, Sequelize} = require('sequelize')

//total responden 
const totalResponden = async (req,res) => {
    try {
        const date = new Date()
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear()
        const semester1 = ['01','02','03', '04', '05', '06']
        const semester2 = ['07', '08', '09', '10', '11', '12']

        console.log(month)
        const findMonth = semester1.find(item => item == month)
        if (!findMonth) {
            const findLakiLaki = await modelResponden.count({
                where:{
                    jenis_kelamin: 'Laki - laki',
                    created_at: {
                        [Op.and]: [
                            Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                            Sequelize.literal(`YEAR(created_at)= ${year}`)
                        ],
                    }
                }
            })
            const findPerempuan = await modelResponden.count({
                where:{
                    jenis_kelamin: 'Perempuan',
                    created_at: {
                        [Op.and]: [
                            Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                            Sequelize.literal(`YEAR(created_at)= ${year}`)
                        ]
                    }
                }
            })
            return res.status(200).json({success: true, message:'Total data ditemukan', totalLaki: findLakiLaki, totalPerempuan:findPerempuan})     
        }
        const findLakiLaki = await modelResponden.count({
            where:{
                jenis_kelamin: 'Laki - laki',
                created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }
            }
        })
        const findPerempuan = await modelResponden.count({
            where:{
                jenis_kelamin: 'Perempuan',
                created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }
            }
        })
        return res.status(200).json({success: true, message:'Total data ditemukan', totalLaki: findLakiLaki, totalPerempuan:findPerempuan})    

          
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:error})
    }    
}

//usia responden
const usiaResponden = async (req,res) => {
    try {
        const date = new Date()
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear()
        const semester1 = ['01','02','03', '04', '05', '06']
        const semester2 = ['07', '08', '09', '10', '11', '12']

        console.log(month)
        const findMonth = semester1.find(item => item == month)
        if (!findMonth) {
            const findUsia1 = await modelResponden.count({
                where: {usia: '15 s.d 25', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            const findUsia2 = await modelResponden.count({
                where:{usia: '26 s.d 35', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            const findusia3 = await modelResponden.count({
                where:{usia: '36 s.d 50', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            const findUsia4 = await modelResponden.count({
                where:{usia: '51 s.d 60', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            return res.status(200).json({
                success: true, 
                message: 'Total usia ditemukan',
                1525: findUsia1,
                2635: findUsia2,
                3650: findusia3,
                5160: findUsia4
            })        
             
        }
        const findUsia1 = await modelResponden.count({
            where: {usia: '15 s.d 25', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        const findUsia2 = await modelResponden.count({
            where:{usia: '26 s.d 35', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        const findusia3 = await modelResponden.count({
            where:{usia: '36 s.d 50', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        const findUsia4 = await modelResponden.count({
            where:{usia: '51 s.d 60', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        return res.status(200).json({
            success: true, 
            message: 'Total usia ditemukan',
            1525: findUsia1,
            2635: findUsia2,
            3650: findusia3,
            5160: findUsia4
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message: error})
    }
    
}

//jumlah berdasar jenjang pendidikan
const totalPendidikan = async (req,res) => {
    try {
        const date = new Date()
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear()
        const semester1 = ['01','02','03', '04', '05', '06']
        const semester2 = ['07', '08', '09', '10', '11', '12']

        console.log(month)
        const findMonth = semester1.find(item => item == month)
        if (!findMonth) {
            const findSD = await modelResponden.count({
                where:{jenjang_pendidikan: 'SD/SLTP', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            const findSLTA = await modelResponden.count({
                where:{jenjang_pendidikan: 'SLTA', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            const findDiploma = await modelResponden.count({
                where:{jenjang_pendidikan: 'D1/D2/D3', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            const findSarjana = await modelResponden.count({
                where:{jenjang_pendidikan: 'D4/S1', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            const findS2 = await modelResponden.count({
                where:{jenjang_pendidikan: 'S2 Keatas', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            return res.status(200).json({success:true, message:'Total ditemukan', SD:findSD, SLTA:findSLTA, diploma: findDiploma, sarjana: findSarjana, s2: findS2})  
        }
        const findSD = await modelResponden.count({
            where:{jenjang_pendidikan: 'SD/SLTP', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        const findSLTA = await modelResponden.count({
            where:{jenjang_pendidikan: 'SLTA', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        const findDiploma = await modelResponden.count({
            where:{jenjang_pendidikan: 'D1/D2/D3', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        const findSarjana = await modelResponden.count({
            where:{jenjang_pendidikan: 'D4/S1', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        const findS2 = await modelResponden.count({
            where:{jenjang_pendidikan: 'S2 Keatas', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        return res.status(200).json({success:true, message:'Total ditemukan', SD:findSD, SLTA:findSLTA, diploma: findDiploma, sarjana: findSarjana, s2: findS2}) 
          
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:error})
    }
    
}

//pkerjaan responden
const totalPekerjaan = async (req,res) => {
    try {
        const date = new Date()
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const year = date.getFullYear()
        const semester1 = ['01','02','03', '04', '05', '06']
        const semester2 = ['07', '08', '09', '10', '11', '12']

        console.log(month)
        const findMonth = semester1.find(item => item == month)
        if (!findMonth) {
            const findPNS = await modelResponden.count({
                where:{pekerjaan: 'PNS/POLRI/TNI/PPPK', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            const findWiraswasta = await modelResponden.count({
                where:{pekerjaan: 'Wiraswasta', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            const findSwasta = await modelResponden.count({
                where:{pekerjaan: 'Swasta', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            const findPelajar = await modelResponden.count({
                where:{pekerjaan: 'Pelajar/Mahasiswa', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            const findLainnya = await modelResponden.count({
                where:{pekerjaan: 'Lainnya', created_at: {
                    [Op.and]: [
                        Sequelize.literal('MONTH(created_at) IN (7, 8, 9, 10, 11, 12)'),
                        Sequelize.literal(`YEAR(created_at)= ${year}`)
                    ]
                }}
            })
            return res.status(200).json({success:true, message: 'Total ditemukan', pns:findPNS, wiraswasta:findWiraswasta, swasta:findSwasta, pelajar:findPelajar, lainnya:findLainnya})
        }
        const findPNS = await modelResponden.count({
            where:{pekerjaan: 'PNS/POLRI/TNI/PPPK', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        const findWiraswasta = await modelResponden.count({
            where:{pekerjaan: 'Wiraswasta', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        const findSwasta = await modelResponden.count({
            where:{pekerjaan: 'Swasta', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        const findPelajar = await modelResponden.count({
            where:{pekerjaan: 'Pelajar/Mahasiswa', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        const findLainnya = await modelResponden.count({
            where:{pekerjaan: 'Lainnya', created_at: {
                [Op.and]: [
                    Sequelize.literal('MONTH(created_at) IN (1, 2, 3, 4, 5, 6)'),
                    Sequelize.literal(`YEAR(created_at)= ${year}`)
                ]
            }}
        })
        return res.status(200).json({success:true, message: 'Total ditemukan', pns:findPNS, wiraswasta:findWiraswasta, swasta:findSwasta, pelajar:findPelajar, lainnya:findLainnya})

    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error})
    }
}


module.exports = {totalResponden, usiaResponden, totalPendidikan, totalPekerjaan}