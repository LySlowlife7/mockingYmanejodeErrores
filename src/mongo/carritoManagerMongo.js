import { cartsModel } from "./models/carts.models.js";

export class CartsManagerMongo{
    constructor(){
        this.model= cartsModel;
    };

    // Obtener Carritos
    async getCarts(){
        try {
            const result = await this.model.find().lean().populate("products.productId");
            return result;
        } catch (error) {
            console.log("getCarts: ", error.message);
            throw new Error("Se produjo un error al obtener los carritos");
        }
    };

    // Obtener Carritos por ID
    async getCartById(cartId){
        try {
            const result = await this.model.findById(cartId).populate("products.productId");
            if(!result){
                throw new Error(`El carrito con el ID: '${cartId}' no existe.`);
            };
            return result;
        } catch (error) {
            console.log(error.message);
            throw new Error("No se pudo obtener el carrito");
        }
    };

    // Crear Carrito
    async createCart(){
        try {
            const newCart = {};
            const result = await this.model.create(newCart);
            return result;
        } catch (error) {
            console.log(error.message);
            throw new Error("No se pudo crear el carrito");
        }
    };

    // Eliminar Carrito
    async deleteCart(cartId){
        try {
            const result = await this.model.findByIdAndDelete(cartId);
            return result;
        } catch (error) {
            console.log(error.message);
            throw new Error("No se pudo eliminar el carrito");
        }
    };

    // Agregar Producto al Carrito
    async addProductInCart(cartId, productId){
        try {
            const cart = await this.getCartById(cartId);
            const productExist = cart.products.find( item => item.productId._id == productId);

            productExist
            ? (productExist.quantity += 1)
            : cart.products.push({
                productId: productId,
                quantity: 1
            });
              
            const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true});
            return result;
        } catch (error) {
            console.log(error.message);
            throw new Error("No se pudo agregar el producto al carrito");
        }
    };

    // Eliminar Productos de un Carrito
    async deleteProduct(cartId, productId){
        try {
            const cart = await this.getCartById(cartId);
            const productExist = cart.products.find(item => item.productId._id == productId);
            if(productExist){
                //si el producto existe en el carrito
                const newProducts = cart.products.filter(item => item.productId._id != productId);
                cart.products = newProducts;
                const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true});
                return result;
            } else {
                throw new Error("El producto no se puede eliminar porque no ha sido agregado");
            }
        } catch (error) {
            console.log("deleteProduct", error.message);
            throw new Error("No se pudo eliminar el producto del carrito");
        }
    };

    // Actualizar Cantidad de Productos en el Carrito
    async updateProductCart(cartId, productId, newQuantity){
        try {
            const cart = await this.getCartById(cartId);
            const productIndex = cart.products.findIndex( item => item.productId._id == productId);
            if( productIndex >=0 ){
                // //si el producto existe en el carrito
                cart.products[productIndex].quantity = newQuantity;
                const result = await this.model.findByIdAndUpdate(cartId, cart, {new:true});
                return result;
            } else {
                throw new Error("El producto no se puede actualizar porque no ha sido agregado");
            }
        } catch (error) {
            console.log("updateProductCart", error.message);
            throw new Error("No se pudo actualizar el producto al carrito");
        }
    };
}