![Logo](https://i.imgur.com/ByC9Noq.png)

# Boards For Less !

“Boards For Less !” is an interactive web application that connects users looking to try new 
games with users that are looking to rent them out. With autocomplete from Board Game Atlas 
API and the map technology of Google Maps Platform API, users can use the site seamlessly.

## Links

- [Demo Video](https://youtu.be/VIrHKbnix7M)
- [Live Site](https://boards-for-less.netlify.app/)
- [Front-End Repo](https://github.com/m-sekander/boards-for-less-client)

## Tech Stack

**Client:** React, Sass, ReactRouterDOM, Axios

**Server:** Node, Express, CORS, Bcrypt, Axios, JWT, Knex, MySQL2, validator.js

**External APIs:** Google Maps Platform, Board Games Atlas

## Features

- User login and registration via JWT authorization, passwords stored securely through bcrypt encryption
- Google Places Autocomplete allowing users to provide accurate address when registering
- Listing board games with proper validation, autocomplete help via Board Game Atlas if entered game name is found
- Renting board games with the help of Google Maps JS to conveniently display the nearest games (or searched game) with markers centred around user’s geolocation
- Ability to contact the owner of specific board game, if desired
- My accounts page listing user’s details and their listed board games (option to delete a listed game, if desired)

## Feedback & Support

If you have any feedback or require support, please reach out to me at my [email](moinuddin8510@gmail.com) or on [LinkedIn](https://www.linkedin.com/in/moinsekander/).
