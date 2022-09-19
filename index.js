require("dotenv").config();
const PORT = process.env.PORT || 8080;

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());


app.listen(PORT, () => {
    console.log("Backend server is running at port:" , PORT);
});