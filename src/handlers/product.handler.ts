import { Application, Request, Response } from "express";
import HttpStatusCode from "../enums/HttpStausCode";
import { Product, ProductModel } from "../models/product.model";
// import {checkAuthHeader} from "./helpers"
import { apiResponse } from "../helpers/ApiResponse";

const productModelInstance = new ProductModel();

export const index = async (req: Request, res: Response) => {
  try {
    const products: Product[] = await productModelInstance.index();

    res.status(HttpStatusCode.OK);
    res.json(apiResponse(products, HttpStatusCode.OK));
  } catch (e) {
    res.status(HttpStatusCode.BAD_REQUEST);
    res.json(e);
  }
}; // end fun index

export const store = async (req: Request, res: Response) => {
  try {
    const name = req.body.name as unknown as string;
    const price = req.body.price as unknown as number;

    if (name === undefined || price === undefined) {
      res.status(HttpStatusCode.BAD_REQUEST);

      res.json(
        apiResponse(
          "",
          HttpStatusCode.BAD_REQUEST,
          "All field ( :name, :price) is required"
        )
      );

      return false;
    }

    const product: Product = await productModelInstance.store({ name, price });

    res.json(product);
  } catch (e) {
    console.log(e);
    res.status(HttpStatusCode.BAD_REQUEST);
    res.json(
      apiResponse(
        "",
        HttpStatusCode.UNAUTHORIZED,
        "Access denied, invalid token."
      )
    );
  }
}; // end fun store

export const show = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (id === undefined) {
      res.status(HttpStatusCode.BAD_REQUEST);
      res.json(
        apiResponse(
          "",
          HttpStatusCode.BAD_REQUEST,
          "The field ( :id) is required!"
        )
      );

      return false;
    }

    const product: Product = await productModelInstance.show(id);

    res.json(product);
  } catch (e) {
    res.status(HttpStatusCode.BAD_REQUEST);
    res.json(e);
  }
}; // end fun show

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;
    const name = req.body.name as unknown as string;
    const price = req.body.price as unknown as number;

    if (name === undefined || price === undefined || id === undefined) {
      res.status(HttpStatusCode.BAD_REQUEST);
      res.json(
        apiResponse(
          "",
          HttpStatusCode.BAD_REQUEST,
          "All field ( :name, :price, :id) is required!"
        )
      );
      return false;
    }

    const product: Product = await productModelInstance.update(id, {
      name,
      price,
    });

    res.json(product);
  } catch (e) {
    res.status(HttpStatusCode.BAD_REQUEST);
    res.json(e);
  }
}; // end func update

export const destroy = async (req: Request, res: Response) => {
  try {
    const id = req.params.id as unknown as number;

    if (id === undefined) {
      res.status(HttpStatusCode.BAD_REQUEST);
      res.json(
        apiResponse(
          "",
          HttpStatusCode.BAD_REQUEST,
          "The field :id is required."
        )
      );

      return false;
    }

    await productModelInstance.deleteProduct(id);

    res.json(
      apiResponse("", HttpStatusCode.OK, "Product deleted successfully.")
    );
  } catch (e) {
    res.status(HttpStatusCode.BAD_REQUEST);
    res.json(e);
  }
}; // end func destroy
