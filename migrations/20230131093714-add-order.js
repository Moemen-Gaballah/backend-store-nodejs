/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("orders", {
    id: "id",
    user_id: {
      type: "integer",
      notNull: true,
      references: "users",
      // onDelete: 'cascade',
    },
    price: { type: "integer", default: 0 },
    status: { type: "varchar(50)", default: "pending" },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createIndex("orders", "user_id");
};

exports.down = (pgm) => {
  pgm.dropTable("orders");
};
