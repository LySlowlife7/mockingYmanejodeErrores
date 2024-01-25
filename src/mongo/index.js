import { ProductsManagerMongo } from "./productsManagerMongo.js";
import { CartsManagerMongo } from "./cartsManagerMongo.js";
import { UsersManagerMongo } from "./usersManagerMongo.js";

export const productsService = new ProductsManagerMongo();
export const cartsService = new CartsManagerMongo();
export const usersService = new UsersManagerMongo();