const response = require('express')
const jwt = require('jsonwebtoken')
const controller = {}
const path = require('path')

const viewsSkm = async (req, res) => {
    res.render('index')
}
controller.viewsSkm = viewsSkm;

const viewsLogin = async (req, res) => {
    res.render('admin/login')
}
controller.viewsLogin = viewsLogin;

const viewsDashboard = async (req, res) => {
    res.render('admin/dashboard')
}
controller.viewsDashboard = viewsDashboard;

const viewsHasilSurvey = async (req, res) => {
    res.render('admin/hasilSurvey')
}
controller.viewsHasilSurvey = viewsHasilSurvey;

const viewsRiwayatSurvey = async (req, res) => {
    res.render('admin/riwayatSurvey')
}
controller.viewsRiwayatSurvey = viewsRiwayatSurvey;

const viewsProfile = async (req, res) => {
    res.render('admin/profile')
}
controller.viewsProfile = viewsProfile;

const viewsChangePass = async (req, res) => {
    res.render('admin/changePass')
}
controller.viewsChangePass = viewsChangePass;

const viewsForgotPass = async (req, res) => {
    res.render('admin/forgotPass')
}
controller.viewsForgotPass = viewsForgotPass;

const viewsBiodata = async (req, res) => {
    res.render('responden/biodata')
}
controller.viewsBiodata = viewsBiodata;

const viewsKuisioner = async (req, res) => {
    res.render('responden/kuisioner')
}
controller.viewsKuisioner = viewsKuisioner;

const viewsAspirasiSaran = async (req, res) => {
    res.render('responden/aspirasiSaran')
}
controller.viewsAspirasiSaran = viewsAspirasiSaran;

const viewsThankyou = async (req, res) => {
    res.render('responden/thankyou')
}
controller.viewsThankyou = viewsThankyou;


module.exports = controller