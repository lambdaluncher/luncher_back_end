
exports.up = function(knex) {
  return knex.schema.createTable('schools', schools => {
    schools.increments();
    schools
        .string('schoolName')
        .notNullable()
        .unique();
    schools
        .string('schoolAddress');
    schools
        .integer('fundsRequested');
    schools
        .integer('fundsReceived');
    schools
        .integer('adminId')
        .unsigned();
    schools
        .foreign('adminId')
        .references('id')
        .on('admins');
  });
};

exports.down = function(knex) {
  return knex.schema.dropTableIfExists('schools');
};
