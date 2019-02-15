
exports.up = function(knex) {
    return knex.schema.createTable('donors', donors => {
        donors
            .increments();
        donors
            .string('username')
            .notNullable()
            .unique();
        donors
            .string('password')
            .notNullable();
        donors
            .string('firstName');
        donors
            .string('lastName');
        donors
            .string('email');
        donors
            .string('type');
      });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('donors');
};
