const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const Employee = require('../../models/Employee');
const EmpList = require('../../models/EmpList');
const config = require('config');
var nodemailer = require('nodemailer');
const crypto = require('crypto'); 

// registering user on DB
router.post('/', [
    check('name', 'Name is required').not().isEmpty(),     //validating our request with express-validator
    check('email', 'enter valid email id').isEmail()
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
                address                // made instance of user with all its fields as per model's Employee.js file
            });
        
            const savedUser = await user.save();


        // creating token to verify user when he click link from mail
        const userToken = crypto.randomBytes(16).toString('hex');  // reste token
        const userTokenExpiresAt = Date.now() + 1800000;  // valid for half hour
        const redirectLink = `http://localhost:3000/discoverchild/${savedUser._id}/${userToken}`;  //this link will go on mail 

        user.userToken = userToken;
        user.userTokenExpiresAt = userTokenExpiresAt;
        user.isTokenUsed = false
        var transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
              user: 'zenconnect02@gmail.com',
              pass: 'React.createPassword'
            }
          });
          
          var mailOptions = {
            from: 'zenconnect02@gmail.com',
            to: user.email,
            subject: 'Secret Santa Game',
            html: `<h4> Hello ${user.name}, </h4>
            <p> You have just enrolled for secret santa game. </p>
            <p> Click the link below to discover your child. </p>
            
            <a href=${redirectLink}>Discover your Child</a>

            <p>If you are having trouble clicking the link, copy & paste URL below into your web browser.</p>

            <p><i><font color="blue"> ${redirectLink} </font></i></p>

            
            <p> Thanks, </p>
            <h4> Secret Santa Team </h4>`
          };
          
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
                return res.status(400).json({errors: [{msg: 'Error occured while sending mail'}]});
            } else {
                return res.status(200).json({errors: [{msg: 'Mail sent successfully'}]});
            }
          });
         
          
          await user.save();

          return res.status(201).json({
            data: user,
            msg: 'Please chek your E-Mail',
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

    router.get('/discoverchild/:empid/:token', async(req,res) => {
        
        try {
            const employeeDetails = await Employee.findById(req.params.empid);

            if(!employeeDetails){
                res.status(404).json({error: "It looks like you are not registered with us"});
            }


            if (req.params.token === employeeDetails.userToken) { // checking if user already used that link once
                if(!employeeDetails.isTokenUsed){
                    return res.status(200).json(employeeDetails);
                }else{
                    return res.status(400).json({ error: 'You have already played the game' });
                }
            } else {
                return res.status(400).json({ error: 'Invalid Token' });
            }

        } catch (error) {
            console.log(error.kind);
            if(error.kind === 'ObjectId') {     // if we pass an invalid post id
                res.status(404).json({error: "It looks like you are not registered with us"});
            }
            res.status(500).send('sever error');
        }
    });


    //add employee from admin panel

    router.post('/admin/addemployee', [
        check('name', 'Name is required').not().isEmpty(),     //validating our request with express-validator
        check('email', 'enter valid email id').isEmail()
    ],
        async (req, res) => {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return res.status(400).json({ errors: errors.array() });
            }
           
            //getting name email n password
            const { name, email } = req.body;
            try {
                //see if user exist
                
                let user = await EmpList.findOne({ email });
    
                if (user) {
                    return res.status(400).json({
                        error: 'Employee entry already exist',
                        success: false
                    })
                }
                
                user = new EmpList({
                    name,
                    email               // made instance of user with all its fields as per model's Employee.js file
                });
            
                    
              await user.save();
    
              return res.status(201).json({
                msg: 'Employee added successully in DB',
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


        //fetching all available employees to show to Admin

        router.get('/admin/fetchemployees', async(req, res) => {
            try {
                const employees = await EmpList.find();
                return res.status(200).json({
                    data: employees,
                    count: employees.length,
                    success: true
                })
            } catch (error) {
                return res.status(500).json({
                    error: 'Server Error',
                    success: false
                })
            }
        });

    module.exports = router;