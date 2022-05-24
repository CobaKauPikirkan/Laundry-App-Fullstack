//import express
const express = require("express")
const app = express()
app.use(express.json())
const bodyParser = require('body-parser');

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "ukllaundry"

// import md5
const md5 = require("md5")

//implementasi library
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const models = require("../models/index")
const paket = models.paket

//endpoint get all
app.get("/", (req,res) => {
    paket.findAll()
        .then(result => {
            res.json({
                paket : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
//endpoint get id
app.get("/:id_paket", (req, res) =>{
    paket.findOne({ where: {id_paket: req.params.id_paket}})
    .then(result => {
        res.json({
            paket: result
        })
    })
    .catch(error => {
        res.json({
            message: error.message
        })
    })
})

//endpoint uost
app.post("/", (req,res) => {
    let data = {
        id_outlet : req.body.id_outlet,
        jenis : req.body.jenis,
        nama_paket : (req.body.nama_paket),
        harga : (req.body.harga)
    }

    console.log(data.jenis);

    paket.create(data)
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
        id_paket : req.params.id
    }
    let data = {
        id_outlet : req.body.id_outlet,
        jenis : req.body.jenis,
        nama_paket : (req.body.nama_paket),
        harga : (req.body.harga)
    }
    paket.update(data, {where: param})
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
        id_paket : req.params.id
    }
    paket.destroy({where: param})
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