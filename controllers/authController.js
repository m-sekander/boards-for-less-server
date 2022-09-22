const jwt = require('jsonwebtoken');

const knex = require('knex')(require("../knexfile"));

const bcrypt = require('bcrypt');
const saltRounds = 10;

exports.signup = (req, res) => {
    const { email, name, password, confirmPassword, address, coordinates } = req.body;
    
    if (!email || !name || !password || !confirmPassword || !address || !coordinates) {
        return res.status(400).json({message: 'Please make sure to provide email, name, password, confirmPassword, address and coordinates fields in the request', data: req.body});
    }
    if (password !== confirmPassword) {
        return res.status(400).json({message: "Passwords don't match, please try filling them in again"});
    }
    
    const hashedPassword = bcrypt.hashSync(password, saltRounds);
    
    knex("users")
    .where({ email })
    .then((result) => {
        if (result.length === 1) {
            return res.status(400).json({message: "The associated email already has an account"});
        }
        return knex("users")
        .insert({ email, name, password: hashedPassword, address, coordinates })
        .then((_result) => {
            return res.json({message: "User added successfully"});
        })
    }).catch((error) => {
        return res.status(500).json({message: "Unable to create new user", error});
    })
}

exports.login = (req, res) => {
    const { email, password } = req.body;

    knex("users")
    .where({ email })
    .then((result) => {
        const user = result[0];
        const matchPasswords = bcrypt.compareSync(password, user.password, saltRounds);
        if (matchPasswords) {
            const token = jwt.sign({ email: user.email }, process.env.SECRET_KEY);
            return res.json({token});
        } else {
            return res.status(403).json({message: "Credentials were incorrect"});
        }
    }).catch((error) => {
        return res.status(500).json({message: "Unable to retreive user or it does not exist", error});
    })
}