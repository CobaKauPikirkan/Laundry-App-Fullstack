//import library
const express = require('express');
const bodyParser = require('body-parser');
const md5 = require('md5');

//import auth
const auth = require("../auth")
const jwt = require("jsonwebtoken")
const SECRET_KEY = "ukllaundry"

//implementasi library
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//import model
const model = require('../models/index');
const user = model.user

//endpoint login
app.post("/", async (req,res) => {
    let data= {
        username: req.body.username,
        password: md5(req.body.password)
    }

    let result = await user.findOne({where: data})
    if(result){
        let payload = JSON.stringify(result)
        // generate token
        let token = jwt.sign(payload, SECRET_KEY)
        res.json({
            logged: true,
            data: result,
            role: result.role,
            id_outlet: result.id_outlet,
            token: token
        })
    }else{
        res.json({
            logged: false,
            message: "Invalid username or password"
        })
    }
})

app.get("/isUserAuth", auth, (req, res) => {
    res.send("Anda sudah terotentikasi")
})

module.exports = app