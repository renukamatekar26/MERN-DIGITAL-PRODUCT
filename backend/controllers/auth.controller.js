const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user.model');

const router = express.Router();

router.post('/register', async(req,res) =>{
    try {
        const {name, email, password} = req?.body;
        if(!name || !email || !password){
            return res.status(401).json('missing required fields');
        }
        const userExists = await User.findOne({ email });
        if(userExists){
            return res.status(400).json('User is already registered');
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = new User({
            name,
            email, 
            password: hashedPassword 
        });
        const saveUser =await newUser.save();

        // generate jwt token and set expiry 1hr
        const token = jwt.sign(
            { id: saveUser._id },
            process.env.JWT_SECRET,
            {expiresIn: '1h'}
        );

        res.status(201).json({token, message: 'User registered successfully'})
    } catch (error) {
        res.status(500).json('Error while registering the user')
    }
})


router.post('/login', async(req,res) =>{
    try {
        const {email, password} = req?.body;
        console.log(email, password);
        
        if(!email || !password) return res.status(401).json('Missing required fields');
        const user =await User.findOne({ email });
        if(!user) return res.status(400).json(`User doesn't exist`);

        const isMatch = await bcrypt.compare(password, user?.password);
        console.log(isMatch,"isMatch")
        if(!isMatch) return res.status(400).json("Invalid credentials");

        debugger
        const payload = { 
            id: user?._id,
            email: user?.email, 
        }
        debugger
        console.log('payload', payload);
        
        // assign a jst token with 1hr expiry
        jwt.sign(
            payload, 
            process.env.JWT_SECRET,
            {expiresIn: 3600},
            (error, token) => {
                if(error) {
                    console.log("errrrrrrrrrrrr", error);
                    
                    throw new Error('new error', error)};
                res.json({token, user: {id: user?._id, email: user?. email}})
            }
        )
    } catch (error) {
        console.error(error);
        res.status(500).json(error);  
    }
})

module.exports = router;