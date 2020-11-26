const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Employee = require('../../models/Employee');
const config = require('config');
var nodemailer = require('nodemailer');

// registering user on DB
router.post('/', [
    check('name', 'Name is required').not().isEmpty()     //validating our request with express-validator
    // check('email', 'enter valid email id').isEmail()
],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }
       
        //getting name email n password
        const { name, email, address } = req.body;
        try {
            //see if user exist
            
            let user = await Employee.findOne({ email });

            if (user) {
                return res.status(400).json({
                    error: 'user already exist',
                    success: false
                })
            }

            user = new Employee({
                name,
                email,
                address                 // made instance of user with all its fields as per model's Employee.js file
            });

            await user.save();

            return res.status(201).json({
                data: user,
                success: true
            })

        } catch (error) {
            if(error.name === "ValidationError"){
                const messages = Object.values(error.errors).map(val => val.message);
    
                return res.status(400).json({
                    error: messages,
                    success: false
                })
            }else{
                return res.status(500).json({
                    error: 'Server Error',
                    success: false
                })
            }
        }

    });

    module.exports = router;