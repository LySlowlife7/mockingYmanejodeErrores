import { Router } from "express";
import { cartsService } from "../mongo/index.js";
import { productsService } from "../mongo/index.js";

export const cartsRouter = Router();

// Obtener Carrito
cartsRouter.get("/", async(req,res)=>{
    try {
        const carts = await cartsService.getCarts();
        res.json({data:carts});
    } catch (error) {
        res.json({error:error.message});
    }
});

// Obtener Carrito por ID
cartsRouter.get("/:cid", async(req,res)=>{
    try {
        const cartId = req.params.cid;
        const cart = await cartsService.getCartById(cartId);
        res.json({status:"success", data: cart});
    } catch (error) {
        res.json({error:error.message});
    }
});

// Crear Carrito
cartsRouter.post("/",async(req,res)=>{
    try {
        const cartCreated = await cartsService.createCart();
        res.json({status:"success",data: cartCreated});
    } catch (error) {
        res.json({status:"error",error:error.message});
    }
});

// Agregar producto en carrito
cartsRouter.post("/:cid/product/:pid", async(req,res)=>{
    try {
        const {cid:cartId, pid:productId} = req.params;
        const cart = await cartsService.getCartById(cartId);
        // const product = await productsService.getProductById(productId);

        const result = await cartsService.addProductInCart(cartId, productId);
        res.json({status:"success", result});
    } catch (error) {
        res.json({error:error.message});
    }
});

// Eliminar Producto de un carrito
cartsRouter.delete("/:cid/product/:pid", async(req,res)=>{
    try {
        const {cid: cartId, pid: productId} = req.params;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.deleteProduct(cartId, productId);
        res.json({status:"success", result});
    } catch (error) {
        res.json({error:error.message});
    }
});

// Eliminar un Carrito
cartsRouter.delete("/:cid", async(req,res)=>{
    try {
        const {cid: cartId} = req.params;
        const result = await cartsService.deleteCart(cartId);
        res.json({status:"success", result});
    } catch (error) {
        res.json({error:error.message});
    }
});

// Actualizar Cantidad de Productos en el Carrito
cartsRouter.put("/:cid/product/:pid", async(req,res)=>{
    try {
        const {cid: cartId, pid: productId} = req.params;
        const {newQuantity} = req.body;
        const cart = await cartsService.getCartById(cartId);
        const result = await cartsService.updateProductCart(cartId, productId, newQuantity);
        res.json({status:"success", result});
    } catch (error) {
        res.json({error:error.message});
    }
});