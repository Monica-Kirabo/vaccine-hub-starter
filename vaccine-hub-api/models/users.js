const {unauthorizedError}=require("../utils/errors")
class User{
    static async login(credentials){
        //user should submit their email and password
        //if any of these fields are missing, throw an error
     throw new unauthorizedError("Invalid email/password")
    }
    static async register(credentials){
     //user should submit email, pw
    }
}

module.exports=User