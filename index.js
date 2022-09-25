require("dotenv").config();
const PORT = process.env.PORT || 8080;

const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");
app.use(cors());

const authRoute = require('./routes/authRoute');
app.use('/auth', authRoute);

const usersRoute = require('./routes/usersRoute');
app.use('/users', usersRoute);

const boardgamesRoute = require('./routes/boardgamesRoute');
app.use('/boardgames', boardgamesRoute);


app.listen(PORT, () => {
    console.log("Backend server is running at port:" , PORT);
});