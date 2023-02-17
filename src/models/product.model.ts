// @ts-ignore
import client from "../config/database";

export interface BaseProduct {
  name: string;
  price: number;
}

export interface Product extends BaseProduct {
  id: number;
}

export class ProductModel {
  async index(): Promise<Product[]> {
    try {
      // @ts-ignore
      const connection = await client.connect();
      const sql = "SELECT * FROM products";

      const { rows } = await connection.query(sql);

      connection.release();

      return rows;
    } catch (err) {
      throw new Error(`Something wrong happened. ${err}`);
    }
  } // end method get all products

  async store(product: BaseProduct): Promise<Product> {
    const { name, price } = product;

    try {
      const sql =
        "INSERT INTO products (name, price, user_id) VALUES($1, $2, $3) RETURNING *";
      // @ts-ignore
      const connection = await client.connect();

      // @ts-ignore
      const { rows } = await connection.query(sql, [name, price, userId]);

      connection.release();

      return rows[0];
    } catch (err) {
      throw new Error(`Something wrong happened. ${name}. ${err}`);
    }
  } // end method add products

  async show(id: number): Promise<Product> {
    try {
      const sql = "SELECT * FROM products WHERE id=($1)";
      // @ts-ignore
      const connection = await client.connect();
      const { rows } = await connection.query(sql, [id]);

      connection.release();

      return rows[0];
    } catch (err) {
      throw new Error(`Product not found "  ${id}. ${err}`);
    }
  } // end method show products

  // TODO only admin or owner update it.
  async update(id: number, newProductData: BaseProduct): Promise<Product> {
    const { name: newName, price } = newProductData;

    try {
      const sql =
        "UPDATE products SET name = $1, price = $2 WHERE id = $3 RETURNING *";
      // @ts-ignore
      const connection = await client.connect();
      const { rows } = await connection.query(sql, [newName, price, id]);

      connection.release();

      return rows[0];
    } catch (err) {
      throw new Error(`Cant update product ${name}. ${err}`);
    }
  } // end method update products

  // TODO only admin or owner delete it.
  async destroy(id: number): Promise<Product> {
    try {
      const sql = "DELETE FROM products WHERE id=($1)";
      // @ts-ignore
      const connection = await client.connect();
      const { rows } = await connection.query(sql, [id]);

      connection.release();

      return rows[0];
    } catch (err) {
      throw new Error(`Product Not Found ${id}. ${err}`);
    }
  } // end method delete Product
} // end class ProductModel
