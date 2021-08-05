const express = require('express')
const passport = require('passport') 
const jwt = require('jsonwebtoken')
const User = require('../models/User')
const config = require('../config/config')


const router = express.Router();

router.post('/signup', (req,res) => {
    if (! req.body.email || ! req.body.password){
        res.status(400)
        res.json({succuss: false, message:"Email and Password Requirement"})
    }else {
        const newUser = new User({
            email: req.body.email,
            //gender: req.body.gender,
            password: req.body.password,
            //role:req.body.role
        })
        newUser.save((err)=>{
            if (err) {
                console.log(err)
                res.status(400)
                return res.json({succuss: false, message:"Email already exists"})
            }
            res.json({
                succuss: true,
                message: "Create User",
                user: newUser
            })
        })
    }
})

router.post('/login', (req,res) => {
    User.findOne({email: req.body.email}, function(err,user){
        if (err) throw err;
        if (!user){
            res.status(401).send({succuss: false, message: "User not found."})
        }else{
            user.comparePassword(req.body.password, function(err, isMatch){
                if (isMatch){
                    const tokenObj = { _id: user._id, email: user.email }
                    const token = jwt.sign(tokenObj, config.secret)
                    res.send({succuss:true, token: 'JWT '+token})
                }else{
                    res.status(401).send({succuss: false, message: 'Wrong Password'})
                }
            })
        }
    })
})
 
module.exports =router;