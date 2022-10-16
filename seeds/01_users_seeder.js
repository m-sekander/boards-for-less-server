const usersData = require('../seed_data/users');

exports.seed = async function(knex) {
  await knex('users').del();
  await knex('users').insert(usersData);
};