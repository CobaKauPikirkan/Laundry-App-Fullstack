//import express
const express = require("express")
const app = express()
app.use(express.json())

// import md5
const md5 = require("md5")
const bodyParser = require('body-parser');

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "ukllaundry"

//implementasi library
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require("../models/index")
const member = models.member

//endpoint get all
app.get("/", (req,res) => {
    member.findAll()
        .then(result => {
            res.json({
                member : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
//endpoint get id
app.get("/:id_member", (req, res) =>{
    member.findOne({ where: {id_member: req.params.id_member}})
    .then(result => {
        res.json({
            member: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint post
app.post("/", (req,res) => {
    let data = {
        nama : req.body.nama,
        alamat : req.body.alamat,
        jenis_kelamin : (req.body.jenis_kelamin),
        tlp : (req.body.tlp)
    }

    member.create(data)
        .then(result => {
            res.json({
                message: "data has been inserted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint update
app.put("/:id", (req,res) => {
    let param = {
        id_member : req.params.id
    }
    let data = {
        nama : req.body.nama,
        alamat : req.body.alamat,
        jenis_kelamin : (req.body.jenis_kelamin),
        tlp : (req.body.tlp)
    }
    member.update(data, {where: param})
        .then(result => {
            res.json({
                message: "data has been updated"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

//endpoint hapus
app.delete("/:id", (req,res) => {
    let param = {
        id_member : req.params.id
    }
    member.destroy({where: param})
        .then(result => {
            res.json({
                message: "data has been deleted"
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})

module.exports = app