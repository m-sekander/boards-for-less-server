exports.up = function(knex) {
    return knex.schema
    .createTable('users', (table) => {
        table.string('email').primary().notNullable();
        table.string('name').notNullable();
        table.string('password').notNullable();
        table.string('address').notNullable();
        table.string('coordinates').notNullable();
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('users')
};