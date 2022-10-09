const knex = require('knex')(require("../knexfile"));

exports.displayName = (req, res) => {
    const {email} = req;

    knex("users")
    .select("name")
    .where({ email })
    .then((result) => {
        if (result.length === 0) {
            return res.status(400).json({message: "User does not exist"});
        } else {
            return res.json({name: result[0].name});
        }
    }).catch((error) => {
        return res.status(500).json({message: "Unable to retreive user, please try again later", error});
    })
}

exports.userDetails = (req, res) => {
    const {email} = req;

    knex("users")
    .select("name", "address")
    .where({ email })
    .then((result) => {
        if (result.length === 0) {
            return res.status(400).json({message: "User does not exist"});
        } else {
            return res.json({email, name: result[0].name, address: result[0].address});
        }
    }).catch((error) => {
        return res.status(500).json({message: "Unable to retreive user, please try again later", error});
    })
}

exports.homeCoordinates = (req, res) => {
    const {email} = req;

    knex("users")
    .select("coordinates")
    .where({ email })
    .then((result) => {
        if (result.length === 0) {
            return res.status(400).json({message: "User does not exist"});
        } else {
            return res.json({coordinates: result[0].coordinates});
        }
    }).catch((error) => {
        return res.status(500).json({message: "Unable to retreive user, please try again later", error});
    })
}