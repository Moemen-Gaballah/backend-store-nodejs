/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable("order_products", {
    id: "id",
    order_id: {
      type: "integer",
      notNull: true,
      references: "orders",
      // onDelete: 'cascade',
    },
    product_id: {
      type: "integer",
      notNull: true,
      references: "products",
      // onDelete: 'cascade',
    },
    quantity: { type: "integer", default: 0 },
    price: { type: "integer", default: 0 },
    createdAt: {
      type: "timestamp",
      notNull: true,
      default: pgm.func("current_timestamp"),
    },
  });
  pgm.createIndex("order_products", "order_id");
  pgm.createIndex("order_products", "product_id");
};

exports.down = (pgm) => {
  pgm.dropTable("order_products");
};
