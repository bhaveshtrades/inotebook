const express = require('express');
const router = express.Router();
const User = require('../models/User');
const { body, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const JWT_SECRET = 'bhaveshisagood$boy';

router.post('/createuser', [
    body('name', 'Enter a valid name').isLength({min: 3}),
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password must be atleast 5 characters').isLength({min: 5})
], async (req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json({errors: errors.array()});
    }
    let user = await User.findOne({email: req.body.email})
    if(user){
        return res.status(400).json({error: 'Sorry a user with this email already exits'});
    }
    const salt = await bcrypt.genSalt(10);
    const secPass = await bcrypt.hash(req.body.password, salt);
     user = await User.create({
        name: req.body.name,
        password: secPass,
        email: req.body.email
    })
    const data = {
        user: {
            id: user.id
        }
    }
    const authToken = jwt.sign(data, JWT_SECRET);

    res.json({authToken});
})

router.post('/login', [
    body('email', 'Enter a valid email').isEmail(),
    body('password', 'Password cannot be blank').exists()
], async(req, res)=>{
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        res.status(400).json({errors: errors.array()});
    }
    try {
        const {email, password} = req.body;
    let user = await User.findOne({email});
    if(!user){
        return res.status(400).json({error: "Please try to login with correct credentials"});
    }
    const passwordCompare = await bcrypt.compare(password, user.password);
    if(!passwordCompare){
        return res.status(400).json({error: "Please try to login with correct credentials"});
    }
    const data = {
        user:{
            id: user.id
        }
    }
    const authToken = jwt.sign(data,  JWT_SECRET);
    res.json({authToken});
    } catch (error) {
        console.log(error.message);
        res.status(500).send('Internet Server Error');
    }
})
