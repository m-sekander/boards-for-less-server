const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController')

router.post('/signup', authController.signup);

router.post('/login', authController.login);

// router
//     .route("/:id")
//         .get(async (req, res) => {
//             const warehouseId = req.params.id;

//             try {
//                 const warehouseData = await knex
//                 .select("*")
//                 .from("warehouse")
//                 .where({ id: warehouseId });

//                 if (warehouseData.length === 0) {
//                     return res.status(404).json({message: "Warehouse not found..."})
//                 }

//                 return res.json(warehouseData);
//             } catch {
//                 return res.status(500).json({message: "Unable to retreive warehouse data"});
//             }
//         })

module.exports = router;