import { usersModel } from "./models/users.models.js";

export class UsersManagerMongo{
    constructor(){
        this.model = usersModel;
    };

    async createUser(userInfo){
        try {
            const result = await this.model.create(userInfo);
            return result;
        } catch (error) {
            console.log("createUser: ", error.message);
            throw new Error("Se produjo un error al crear el usuario");
        }
    };

    async getUserById(userId){
        try {
            const result = await this.model.findById(userId).lean();
            // El lean() cambia de BSON a JSON
            return result;
        } catch (error) {
            console.log("getUserById: ", error.message);
            throw new Error("Se produjo un error obteniendo el usuario");
        }
    };

    async getUserByEmail(userEmail){
        try {
            const result = await this.model.findOne({email: userEmail});
            return result;
        } catch (error) {
            console.log("getUserByEmail: ", error.message);
            throw new Error("Se produjo un error al obtener el usuario");
        }
    };

    async updateProduct(productId, newProductInfo){};

    async deleteProduct(productId){};
}