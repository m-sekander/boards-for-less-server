const knex = require('knex')(require("../knexfile"));

const validator = require('validator');

// rough distance calculation using Pythagorean theorem
function distCalculator(lat1, lng1, lat2, lng2) {
    return Math.hypot((lat1-lat2), (lng1-lng2))
}

exports.listGame = (req, res) => {
    const { email } = req;
    const { name, category, minPlayers, maxPlayers, minAge, avgPlay, description, price, availableUntil } = req.body;

    // validation checks
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

    if (Number(minPlayers) > Number(maxPlayers)) {
        return res.status(400).json({message: "Minimum players cannot be greater than maximum players"})
    }

    const today = new Date();
    let minDate = new Date();
    minDate.setDate(today.getDate() + 6);
    if (new Date(availableUntil) < today) {
        return res.status(400).json({message: "Cannot set date to the past"});
    } else if (new Date(availableUntil) < minDate) {
        return res.status(400).json({message: "Minimum date availability must be over 1 week from now"});
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

exports.retrieveListings = (req, res) => {
    const { email } = req;
    const userLat = req.query.lat;
    const userLng = req.query.lng;


    knex("boardgames")
    .whereNot({user_email: email})
    .join("users", "user_email", "=", "email")
    .select("boardgames.*", "address", "coordinates")
    .then((result) => {
        if (result.length === 0) {
            return res.status(404).json({message: "No board games listings are available at the moment, check again later"})
        }
        // sorts board game listings closest to further from user that requested it
        const sortedBoardgames = result.sort((a, b) => {
            const aCoordinates = a.coordinates.split(",");
            const bCoordinates = b.coordinates.split(",");
            return distCalculator(userLat, userLng, aCoordinates[0], aCoordinates[1]) - distCalculator(userLat, userLng, bCoordinates[0], bCoordinates[1]);
        })
        return res.json({message: "Board game listings retrieved successfully", sortedBoardgames: sortedBoardgames});
    }).catch((error) => {
        return res.status(500).json({message: "Unable to get nearby board game listings at the moment", error});
    })
}

exports.retrieveNameListings = (req, res) => {
    // const { email } = req;
    // const userLat = req.query.lat;
    // const userLng = req.query.lng;

    let { boardgameName } = req.params;
    boardgameName = boardgameName.replaceAll("+", " ");

    return res.json({ message: `Working...`, boardgameName });
}

exports.retrieveNamedListings = (req, res) => {
    const { email } = req;
    const userLat = req.query.lat;
    const userLng = req.query.lng;

    let { boardgameName } = req.params;
    boardgameName = boardgameName.replaceAll("+", " ");
    
    return res.send("Working...")

    knex("boardgames")
    .whereNot({user_email: email})
    .where({"boardgames.name": boardgameName})
    .join("users", "user_email", "=", "email")
    .select("boardgames.*", "address", "coordinates")
    .then((result) => {
        if (result.length === 0) {
            return res.status(404).json({message: `No ${boardgameName} listings are available at the moment, check again later`})
        }
        // sorts board game listings closest to further from user that requested it
        const sortedBoardgames = result.sort((a, b) => {
            const aCoordinates = a.coordinates.split(",");
            const bCoordinates = b.coordinates.split(",");
            return distCalculator(userLat, userLng, aCoordinates[0], aCoordinates[1]) - distCalculator(userLat, userLng, bCoordinates[0], bCoordinates[1]);
        })
        return res.json({message: `${boardgameName} listings retrieved successfully`, sortedBoardgames: sortedBoardgames.slice(0, 10)});
    }).catch((error) => {
        return res.status(500).json({message: `Unable to get nearby ${boardgameName} listings at the moment`, error});
    })
}

exports.retrieveUserListings = (req, res) => {
    const { email } = req;

    knex("boardgames")
    .where({user_email: email})
    .then((result) => {
        if (result.length === 0) {
            return res.status(404).json({message: "User currently has no board game listings"})
        }
        return res.json({message: "User's board game listings retrieved successfully", result});
    }).catch((error) => {
        return res.status(500).json({message: "Unable to get user's board game listings at the moment", error});
    })
}

exports.retrieveSpecificListing = (req, res) => {
    const { email } = req;
    const { boardgameId } = req.params;
    const { ownerEmail }= req.query;

    if (ownerEmail !== "undefined") {
        knex("boardgames")
        .where({email: ownerEmail})
        .where({"boardgames.id": boardgameId})
        .join("users", "user_email", "=", "email")
        .select("boardgames.*", "users.name", "address")
        .then((result) => {
            if (result.length === 0) {
                return res.status(404).json({message: `The listing requested does not exist`})
            }
            return res.json({message: `The listing was retrieved successfully`, result});
        }).catch((error) => {
            return res.status(500).json({message: `Unable to get the listing at the moment`, error});
        })
    } else {
        knex("boardgames")
        .where({email: email})
        .where({"boardgames.id": boardgameId})
        .join("users", "user_email", "=", "email")
        .select("boardgames.*", "users.name", "address")
        .then((result) => {
            if (result.length === 0) {
                return res.status(404).json({message: `The listing requested does not exist`})
            }
            return res.json({message: `The listing was retrieved successfully`, result});
        }).catch((error) => {
            return res.status(500).json({message: `Unable to get the listing at the moment`, error});
        })
    }
}

exports.deleteSpecificListing = (req, res) => {
    const { email } = req;
    const { boardgameId } = req.params;

    knex("boardgames")
    .where({id: boardgameId, user_email: email})
    .del()
    .then((result) => {
        if (result === 0) {
            return res.status(404).json({message: `The listing to be deleted does not exist`})
        }
        return json.status(204).send();
    }).catch((error) => {
        return res.status(500).json({message: `Unable to delete listing at the moment`, error});
    });
}