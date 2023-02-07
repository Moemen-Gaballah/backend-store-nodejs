/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {

    pgm.createTable('products', {
        id: 'id',
        user_id: {
            type: 'integer',
            notNull: true,
            references: '"users"',
            // onDelete: 'cascade',
        },
        name: {type: 'varchar(255)', notNull: true},
        body: {type: 'text', notNull: false},
        price: {type: 'integer', notNull: true},
        image: {type: 'varchar(255)', default: null},
        createdAt: {
            type: 'timestamp',
            notNull: true,
            default: pgm.func('current_timestamp'),
        },
    })
    pgm.createIndex('products', 'user_id')
};

exports.down = pgm => {
    pgm.dropTable('products');
};