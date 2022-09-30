const bcrypt = require("bcrypt");

const hashedPassword = (password) => {
    return bcrypt.hashSync(password, 10);
};

module.exports = [
    {
        email: "barbar123@yahoo.ca",
        name: "Barry Benson",
        password: hashedPassword("test"),
        address: "421 Wellington St W, Toronto, ON M5V 1E7",
        coordinates: "43.643720,-79.395810",
    },
    {
        email: "darko6@gmail.com",
        name: "Donnie Darko",
        password: hashedPassword("test"),
        address: "28 Bathurst St, Toronto, ON M5V 0C6",
        coordinates: "43.6405841,-79.4025671",
    },
    {
        email: "figkai@outlook.com",
        name: "Figma Kai",
        password: hashedPassword("test"),
        address: "800 Dundas St W, Toronto, ON M6J 1V1",
        coordinates: "43.6520047,-79.4084846",
    },
    {
        email: "hhharmony@gmail.com",
        name: "Hanna H",
        password: hashedPassword("test"),
        address: "483 Queen St W, Toronto, ON M5V 2A9",
        coordinates: "43.6482909,-79.39785",
    },
    {
        email: "jerryj@hotmail.com",
        name: "jerry jam",
        password: hashedPassword("test"),
        address: "720 Queen St W, Toronto, ON M6J 1E8",
        coordinates: "43.6463059,-79.409167",
    },
    {
        email: "lamblarson@gmail.com",
        name: "Lamb Larson",
        password: hashedPassword("test"),
        address: "300 Queen St W, Toronto, ON M5V 2A2",
        coordinates: "43.6496869,-79.3939497",
    },
    {
        email: "moinuddin8510@gmail.com",
        name: "Moin",
        password: hashedPassword("test"),
        address: "550 Wellington St W, Toronto, ON M5V 2V4",
        coordinates: "43.643070, -79.401108",
    },
    {
        email: "nekhilnagi@aws.com",
        name: "Nick N",
        password: hashedPassword("test"),
        address: "9 D'Arcy St, Toronto, ON M5T 1J8, Canada",
        coordinates: "43.6550404,-79.3922529",
    },
    {
        email: "noraneare64@yahoo.com",
        name: "Nora Neare",
        password: hashedPassword("test"),
        address: "625 Queen St W, Toronto, ON M5V 2B7",
        coordinates: "43.6472812,-79.4029079",
    },
    {
        email: "pollypolly1@gmail.com",
        name: "Polly Parrot",
        password: hashedPassword("test"),
        address: "18 Duncan St, Toronto, ON M5H 3G8",
        coordinates: "43.6478695,-79.3886849",
    },
    {
        email: "richie@rocketmail.com",
        name: "Richie",
        password: hashedPassword("test"),
        address: "290 Bremner Blvd, Toronto, ON M5V 3L9",
        coordinates: "43.6426283,-79.3868547",
    },
    {
        email: "tylerthompson@gmail.com",
        name: "Tyler T",
        password: hashedPassword("test"),
        address: "370 King St W, Toronto, ON M5V 1J9",
        coordinates: "43.6465114,-79.3916206",
    },
    {
        email: "zzillow101@yahoo.ca",
        name: "Zara Zillow",
        password: hashedPassword("test"),
        address: "130 Ossington Ave, Toronto, ON M6J 2Z5",
        coordinates: "43.6472032,-79.4201053",
    },
];
