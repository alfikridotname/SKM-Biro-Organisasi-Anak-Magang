const response = require('express')
const modelAdmin = require('../../models/admin')
const bcrpyt = require('bcrypt')
const jwt = require('jsonwebtoken')
const {Op} = require('sequelize')
require('dotenv').config()

//tambah Admin
const tambahAdmin = async (req,res) => {
    try {
        const {username, password, email} = req.body
        const salt = bcrpyt.genSaltSync(10)
        const hashedPass = bcrpyt.hashSync(password, salt)
    
        const addAdmim = await modelAdmin.create({
            username: username,
            password: hashedPass,
            email: email
        })
        if (!addAdmim) {
            return res.status(400).json({success:false, message:'Penambahan admin tidak berhasil'})
        }   
        return res.status(200).json({success:true, message: 'Penambahan admin berhasil'})     
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error})
    }
}

//login Admin
const loginAdmin = async (req,res) => {
    try {
        const {username, password} = req.body
        if (!username || !password) {
            return res.status(400).json({success: false, message: 'Silahkan lengkapi data akun anda'})
        }
        const findAkun = await modelAdmin.findOne({where: {username: username}})
        if (!findAkun) {
            return res.status(400).json({success: false, message: 'Akun dengan username tersebut tidak ditemukan'})
        }
        bcrpyt.compare(password, findAkun.password, async (err, results) => {
            if (err || !results) {
                return res.status(400).json({success:false, message: 'Password akun anda salah'})
            }
            const id_admin = findAkun.id_admin
    
            const token = jwt.sign(
                {
                    username,
                    id_admin
                },
                process.env.ACCESS_TOKEN_SECRET, {
                    expiresIn: '1w'
                }
            )
            req.session.id_admin= id_admin
            res.cookie('token', token, {
                httpOnly: true,
                maxAge: 7 * 24 * 60 * 60 * 1000, 
            });
    
            res.status(200).json({
                success: true,
                message: 'Login berhasil',
                token,
                id_admin
            })
        })        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success:false, message:error})
    }
}

//lupa Password
const lupaPass = async (req,res) => {
    try {
        const {username, email, newPass, confirmPass} = req.body
        if (!username || !email) {
            return res.status(400).json({success: false, message: 'Silahkan lengkapi inputan anda'})
        }
        const findAkun = await modelAdmin.findOne({
            where:{
                [Op.and]: [
                    {username: username},
                    {email: email}
                ]
            }
        })
        if (!findAkun) {
            return res.status(400).json({success: false, message: 'Akun tidak ditemukan'})
        }
        if (!newPass || !confirmPass) {
            return res.status(400).json({success: false, message: 'Silahkan isi password dan konfirmasi password'})
        }        
        if (newPass !== confirmPass) {
            return res.status(400).json({success:false, message: 'Password dan konfirmasi password tidak sama'})
        }
    
        const salt = bcrpyt.genSaltSync(10)
        const hashedPass = bcrpyt.hashSync(newPass, salt)
        await modelAdmin.update({
            password: hashedPass
        }, {
            where:{id_admin:findAkun.id_admin}
        })
        return res.status(200).json({success: true, message: 'Password anda berhasil diubah'})
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error})
    }
    
    
}

//logout Admin
const logoutAdmin = async (req,res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                console.log(err);
                return res.status(500).json({
                    success: false,
                    message: 'Gagal logout',
                });
            }
    
            res.clearCookie('sessionID');
            res.clearCookie('token');
            return res.status(200).json({
                success: true,
                message: 'Logout berhasil',
            });
        });        
    } catch (error) {
        console.log(error);
        return res.status(500).json({success: false, message: error})
    }
}

module.exports = {tambahAdmin, loginAdmin, lupaPass, logoutAdmin}