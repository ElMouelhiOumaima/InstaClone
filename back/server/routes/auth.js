const express = require('express')
const mongoose = require ('mongoose')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const requireLogin = require('../middleware/requireLogin')
const User = mongoose.model("User")
const {JWT_SECRET}= require('../Keys')
const router = express.Router()
router.get('/',(req,res)=>{
    res.send("hello")
})

router.get('/protected',requireLogin,(req,res)=>{
    res.send("hello user")
})
router.post('/signup',(req,res)=>{
    const {email,password,name}= req.body
    if(!email|| !password || !name) {
         return res.status(422).res.json({error:"please add all the fileds"})
   }
    User.findOne({email:email}) 
    .then((savedUser)=>{
        if(savedUser){
            return res.status(422).res.json({error:"user alreadu exists with that email"})
    
        }
        bcrypt.hash(password,12)
        .then(hashedpassword=>{
            const user = new User ({
                email ,
                password:hashedpassword,
                name
            })
            user.save()
            .then(user=>{
                res.json( {message: "saved well "})
        })
       
        })
        .catch (err=>{
            console.log(err)
        })
    })
    .catch(err=>{console.log(err)})
})
router.post('/signin',(req,res)=>{
    const {email,password}=req.body
    if(!email|| !password){
        return res.status(422).json({error: "invalid email or password "})
    }
    User.findOne({email:email})
    .then(savedUser=>{
        if(!savedUser){
            return res.status(422).json({error: "invalid email "})
        }
        bcrypt.compare(password,savedUser.password)
        .then(doMatch=>{
            if (doMatch){
                /* res.json({message:"succefully"}) */
                    const token = jwt.sign({_id:savedUser.id},JWT_SECRET)
                    const {_id,name,email} = savedUser
                    res.json({token,user:{_id,name,email}})
                }
            else {
                return res.status(422).json({error: "invalid email or password "})
            }
        })
        .catch(err=>{
            console.log(err)
        })
    })
})
module.exports = router