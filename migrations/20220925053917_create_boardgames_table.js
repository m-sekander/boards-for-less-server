exports.up = function(knex) {
    return knex.schema
    .createTable('boardgames', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('category').notNullable();
        table.integer('count_min').notNullable();
        table.integer('count_max').notNullable();
        table.integer('age_min').notNullable();
        table.integer('playtime').notNullable();
        table.string('description').notNullable();
        table.decimal('price_weekly', 5, 2).notNullable();
        table.date('available_until').notNullable();
        table.string('user_email').notNullable().references('email').inTable('users').onUpdate('CASCADE').onDelete('CASCADE');
    })
};

exports.down = function(knex) {
    return knex.schema.dropTable('boardgames')
};