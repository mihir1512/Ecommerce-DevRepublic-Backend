const { jwtSecret } = require("../config");
const Customer = require("../models/Customer")
const Cart=require("../models/Cart")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
exports.registerCustomer = async (req, res) => {
    try {
        console.log(`[controller]-[Registration]`)
        const checkEmail = await Customer.findOne({
            email: req.body.email
        });
        if (checkEmail) {
            return res.status(400).json({
                message: 'Email is already registered'
            })
        }
        const encryptPassword = await bcrypt.hash(req.body.password, 10)
        const customer = await Customer.create({
            ...req.body,
            password: encryptPassword
        });
        console.log(`[Customer]-${JSON.stringify(customer)}`);
        // const newCart = new Cart({userId:customer.id, products:[],netAmount:0 });

        // const savedCart = await newCart.save();
        // console.log([`[Saved Cart]-[${JSON.stringify(savedCart)}]`])
              
       res.status(200).json(customer);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

exports.loginCustomer = async (req, res) => {
    try {
        console.log(`[controller]-[Registration]`)
        const checkEmail = await Customer.findOne({
            email: req.body.email
        });
        if (!checkEmail) {
            return res.status(400).json({
                message: 'Email is not registered'
            })
        }

        if (!await bcrypt.compare(req.body.password, checkEmail.password)) {
            return res.status(400).json({
                message: 'Invalid Password'
            })
        }

        const generateToken = await jwt.sign({
            userId: checkEmail._id,
        }, jwtSecret, {
            expiresIn: '77h'
        })

        console.log(`[Customer]-${JSON.stringify(checkEmail)}`);
        res.status(200).json({
            ...checkEmail.toObject(),
            token: generateToken
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};