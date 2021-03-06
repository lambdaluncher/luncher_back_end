
exports.up = function(knex) {
  return knex.schema.createTable('admins', admins => {
    admins
        .increments();
    admins
        .string('username')
        .notNullable()
        .unique();
    admins
        .string('password')
        .notNullable();
    admins
        .string('firstName');
    admins
        .string('lastName');
    admins
        .string('email');
    admins
        .string('type');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('admins');
};
