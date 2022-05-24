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
const outlet = models.outlet

//endpointget all
app.get("/", (req,res) => {
    outlet.findAll()
        .then(result => {
            res.json({
                outlet : result
            })
        })
        .catch(error => {
            res.json({
                message: error.message
            })
        })
})
//endpoint get id
app.get("/:id_outlet", (req, res) =>{
    outlet.findOne({ where: {id_outlet: req.params.id_outlet}})
    .then(result => {
        res.json({
            outlet: result
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
        tlp : (req.body.tlp)
    }

    outlet.create(data)
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
        id_outlet : req.params.id
    }
    let data = {
        nama : req.body.nama,
        alamat : req.body.alamat,
        tlp : md5(req.body.tlp)
    }
    outlet.update(data, {where: param})
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

//endpoint delett
app.delete("/:id", (req,res) => {
    let param = {
        id_outlet : req.params.id
    }
    outlet.destroy({where: param})
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