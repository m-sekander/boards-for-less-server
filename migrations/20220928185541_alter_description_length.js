exports.up = function(knex) {
    return knex.schema
    .alterTable('boardgames', (table) => {
        table.string('description', 2550).notNullable().alter();
    })
};


exports.down = function(knex) {
    return knex.schema
    .alterTable('boardgames', (table) => {
        table.string('description', 255).notNullable().alter();
    })
};
