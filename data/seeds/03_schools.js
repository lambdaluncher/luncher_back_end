
exports.seed = function(knex) {
  return knex('schools').del()
    .then(function () {
      return knex('schools').insert([
        {
          id: 1, 
          schoolName: 'Awesome Academy',
          schoolAddress: '123 Main St',
          fundsRequested: 10000,
          fundsReceived: 5000,
          adminId: 1
        },
        {
          id: 2, 
          schoolName: 'Super School',
          schoolAddress: '777 First Ave',
          fundsRequested: 25000,
          fundsReceived: 10000,
          adminId: 2
        }
      ]);
    });
};
