const boardgamesData = require('../seed_data/boardgames');

exports.seed = async function(knex) {
  await knex('boardgames').del();
  await knex('boardgames').insert(boardgamesData);
};