import { Router } from "express";
import { productsService, cartsService } from "../mongo/index.js";
import { cartsModel } from "../mongo/models/carts.models.js";

export const viewsRouter = Router();

viewsRouter.get("/", async (req, res) => {
    const {limit = 10, page = 1, sort = ""} = req.query;
    const query = {
        // stock: "12"
    };
    const options = {
        limit,
        page,
        sort,
        lean: true
    };
    options.sort =
    sort === "name_asc" ? { title: 1 } :
    sort === "name_desc" ? { title: -1 } :
    sort === "price_asc" ? { price: 1 } :
    sort === "price_desc" ? { price: -1 } :
    sort === "stock_asc" ? { stock: 1 } :
    sort === "stock_desc" ? { stock: -1 } :
    { price: -1 }; 

    const result = await productsService.getProductsPaginate(query, options);
    const baseUrl = req.protocol + "://" + req.get("host") + req.originalUrl;
    const dataProducts = {
        status:"success",
        payload: result.docs,
        totalPages: result.totalPages,
        prevPage: result.prevPage,
        nextPage: result.nextPage,
        page: result.page,
        hasPrevPage: result.hasPrevPage,
        hasNextPage: result.hasNextPage,
        prevLink: result.hasPrevPage 
            ? `${baseUrl.replace(`page=${result.page}`, `page=${result.prevPage}`)}` 
            : null,
        nextLink: result.hasNextPage 
            ? baseUrl.includes("page") 
            ? baseUrl.replace(`page=${result.page}`, `page=${result.nextPage}`) 
            : baseUrl.concat(`?page=${result.nextPage}`) 
            : null
    }
    console.log(dataProducts);

    res.render("products", dataProducts);
});

viewsRouter.get("/cart", async (req, res) => {
    const cartId = await cartsModel.findOne().sort({ carts: -1 });
    const cart = await cartsService.getCartById(cartId,{lean:true});
    const productsCart = cart.products;
    res.render("cart", { products: productsCart})
});

viewsRouter.get("/signup", (req, res) => {
    const userEmail = req.session.email;
    userEmail ? res.render("profileView", {message: "Ya estás registrado", userEmail}) : res.render("signupView");
});

viewsRouter.get("/login", (req, res) => {
    const userEmail = req.session.email;
    userEmail ? res.render("profileView", {message: "Ya iniciaste sesión", userEmail}) : res.render("loginView");
});

viewsRouter.get("/profile", (req, res) => {
    // El req.user viene del deserializeUser
    if(req.user?.first_name){
        const first_name = req.user.first_name;
        res.render("profileView", {first_name});
    } else {
        res.redirect("/login");
    };
});