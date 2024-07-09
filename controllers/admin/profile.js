const response = require('express')
const modelAdmin = require('../../models/admin')
const multer = require('multer')
const path = require('path')
const bcrypt = require('bcrypt')

//detailProfile
const dataProfile = async (req, res) => {
    try {
        const id_admin = req.session.id_admin
        const findData = await modelAdmin.findByPk(id_admin, {
            attributes: ['username', 'email', 'nama', 'foto']
        })
        if (!findData) {
            return res.status(400).json({
                success: false,
                message: 'Data admin tidak ditemukan'
            })
        }
        return res.status(200).json({
            success: true,
            message: 'Data admin ditemukan',
            data: findData
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error
        })
    }

}

//updateProfile
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.join(__dirname, '../', '../', 'public', 'images'))

    },
    filename: function (req, file, cb) {
        cb(null, file.originalname)
    }
})

const fileFilter = function (req, file, cb) {
    const allowedTypes = ['image/jpeg', 'image/png'];
    if (!allowedTypes.includes(file.mimetype)) {
        const error = new multer.MulterError('Jenis File Tidak Di izinkan, Hanya JPEG dan PNG yg Di izinkan');
        error.message = 'Jenis File Tidak Di izinkan, Hanya JPEG dan PNG yg Di izinkan'
        return cb(error, false);
    }
    cb(null, true);
}

const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

const uploadd = upload.single('file')

const updateProfile = async (req, res) => {
    try {
        const id_admin = req.session.id_admin
        const findAkun = await modelAdmin.findByPk(id_admin)
        if (!findAkun) {
            return res.status(400).json({
                success: false,
                message: 'Data akun tidak ditemukan'
            })
        }
        const {
            username,
            nama,
            email,
            passwordLama,
            passwordBaru
        } = req.body
        const foto = req.file

        let updatePassword = true
        let updateFoto = true
        if (!passwordBaru || !passwordLama) {
            updatePassword = false
        }
        if (!foto) {
            updateFoto = false
        }

        if (updateFoto) {
            if (updatePassword) {
                const passwordAsli = findAkun.password
                const passwordMatch = bcrypt.compare(passwordLama, passwordAsli)
                if (!passwordMatch) {
                    return res.status(400).json({
                        success: false,
                        message: 'Password lama anda salah'
                    })
                }
                const salt = bcrypt.genSaltSync(10)
                const encryptPass = bcrypt.hashSync(passwordBaru, salt)
                await modelAdmin.update({
                    username: username || findAkun.username,
                    email: email || findAkun.email,
                    nama: nama || findAkun.nama,
                    foto: foto.originalname,
                    password: encryptPass
                }, {
                    where: {
                        id_admin: id_admin
                    }
                })
                return res.status(200).json({
                    success: true,
                    message: 'Akun anda berhasil diperbaharui'
                })
            } else {
                await modelAdmin.update({
                    username: username || findAkun.username,
                    email: email || findAkun.email,
                    nama: nama || findAkun.nama,
                    foto: foto.originalname
                }, {
                    where: {
                        id_admin: id_admin
                    }
                })
                return res.status(200).json({
                    success: true,
                    message: 'Akun anda berhasil diperbaharui'
                })
            }
        } else {
            if (updatePassword) {
                const passwordAsli = findAkun.password
                const passwordMatch = await bcrypt.compare(passwordLama, passwordAsli);
                if (!passwordMatch) {
                    return res.status(400).json({
                        success: false,
                        message: 'Password lama anda salah'
                    });
                }

                const salt = bcrypt.genSaltSync(10)
                const encryptPass = bcrypt.hashSync(passwordBaru, salt)
                await modelAdmin.update({
                    username: username || findAkun.username,
                    email: email || findAkun.email,
                    nama: nama || findAkun.nama,
                    password: encryptPass
                }, {
                    where: {
                        id_admin: id_admin
                    }
                })
                return res.status(200).json({
                    success: true,
                    message: 'Akun anda berhasil diperbaharui'
                })
            } else {
                await modelAdmin.update({
                    username: username || findAkun.username,
                    email: email || findAkun.email,
                    nama: nama || findAkun.nama
                }, {
                    where: {
                        id_admin: id_admin
                    }
                })
                return res.status(200).json({
                    success: true,
                    message: 'Akun anda berhasil diperbaharui'
                })
            }
        }
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error
        })
    }

}


//logout
const logout = async (req, res) => {
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
        console.log(error)
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}
module.exports = {
    dataProfile,
    logout,
    uploadd,
    updateProfile
}