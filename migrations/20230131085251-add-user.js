/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('users', {
    id: 'id',
    username: {type: 'varchar(255)', notNull: true },
    email: {type: 'varchar(255)', notNull: true, unique: true },
    password: {type: 'varchar(255)', notNull: true },
    isAdmin: { type: 'boolean', default: false },
    createdAt: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  })
};

exports.down = pgm => {
  pgm.dropTable('users');
};