
exports.seed = function(knex) {
  return knex('admins').del()
    .then(function () {
      return knex('admins').insert([
        {
          id: 1, 
          username: 'AddyAdministrator',
          password: 'AddyPassword',
          firstName: 'Addy',
          lastName: 'Administrator',
          email: 'addyadmin123@yahoo.com',
          type: 'admin'
        },
        {
          id: 2, 
          username: 'BoBoss',
          password: 'BoPassword',
          firstName: 'Bo',
          lastName: 'Boss',
          email: 'boboss456@gmail.com',
          type: 'admin'
        }
      ]);
    });
};
