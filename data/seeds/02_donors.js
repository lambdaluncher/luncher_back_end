
exports.seed = function(knex) {
  return knex('donors').del()
    .then(function () {
      return knex('donors').insert([
        {
          id: 1, 
          username: 'PhillyPhil',
          password: 'PhillipPassword',
          firstName: 'Phillip',
          lastName: 'Philanthropist',
          email: 'phillyphil123@gmail.com',
          type: 'donor'
        },
        {
          id: 2, 
          username: 'DonnaDon',
          password: 'DonnaPassword',
          firstName: 'Donna',
          lastName: 'Donator',
          email: 'donnadon456@yahoo.com',
          type: 'donor'
        }
      ]);
    });
};
