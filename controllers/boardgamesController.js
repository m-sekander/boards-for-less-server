const knex = require('knex')(require("../knexfile"));

const validator = require('validator');

exports.helloWorld = (req, res) => {
    res.json({message: "Hello World!"});
}

exports.listGame = (req, res) => {
    const { email } = req;
    const { name, category, minPlayers, maxPlayers, minAge, avgPlay, description, price, availableUntil } = req.body;

    if (!name || !category || !minPlayers || !maxPlayers || !minAge || !avgPlay || !description || !price || !availableUntil) {
        return res.status(400).json({message: "Please make sure to provide all fields in the request", requiredFields: ["name", "category", "minPlayers", "maxPlayers", "minAge", "avgPlay", "description", "price", "availableUntil"], data: req.body});
    }
    if (!validator.isNumeric(`${minPlayers}`)) {
        return res.status(400).json({message: "Please enter an integer number for minimum players"});
    }
    if (!validator.isNumeric(`${maxPlayers}`)) {
        return res.status(400).json({message: "Please enter an integer number for maximum players"});
    }
    if (!validator.isNumeric(`${minAge}`)) {
        return res.status(400).json({message: "Please enter an integer number for minimum age"});
    }
    if (!validator.isNumeric(`${avgPlay}`)) {
        return res.status(400).json({message: "Please enter an integer number for average playtime"});
    }
    if (!validator.isDecimal(`${price}`, {decimal_digits: '1,2'})) {
        return res.status(400).json({message: "Please enter a valid dollar amount for price"});
    }

    const today = new Date();
    let minDate = new Date();
    minDate.setDate(today.getDate() + 7);
    if (new Date(availableUntil) < today) {
        return res.status(400).json({message: "Cannot set date to the past"});
    } else if (new Date(availableUntil) < minDate) {
        return res.status(400).json({message: "Minimum availability must be atleast 1 week"});
    }

    
    knex("boardgames")
    .insert({ name, category, count_min: minPlayers, count_max: maxPlayers, age_min: minAge, playtime: avgPlay, description, price_weekly: price, available_until: availableUntil, user_email : email })
    .then((result) => {
        return knex("boardgames")
        .where({ id: result[0] })
        .then((result) => {
            res.json({message: "Board game listed successfully", result});
        }).catch((error) => {
            res.json({message:"An error has occurred, please try again", error});
        })
    }).catch((error) => {
        return res.status(500).json({message: "Unable to list board game at the moment", error});
    })
}
