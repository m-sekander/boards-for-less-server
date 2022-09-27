const bcrypt = require("bcrypt");

const hashedPassword = (password) => {
    return bcrypt.hashSync(password, 10);
}

module.exports = [
    {
        email: "moinuddin8510@gmail.com",
        name: "Moin Sekander",
        password: hashedPassword("rootroot"),
        address: "146 Stave Crescent, Richmond Hill, ON L4C 0S9",
        coordinates: "43.8899858, -79.4569183",
    },
    {
        email: "test@test.com",
        name: "Tester",
        password: hashedPassword("test"),
        address: "460 King St W, Toronto, ON M5V 1L7",
        coordinates: "43.642052,-79.412003",
    },
];