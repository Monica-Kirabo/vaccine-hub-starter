const { unauthorizedError, BadRequestError}=require("../utils/errors")
const db=require("../db")
const { useScrollTrigger } = require("@material-ui/core")
class User{
    static async login(credentials){
        //user should submit their email and password
        //if any of these fields are missing, throw an error
     throw new unauthorizedError("Invalid email/password")
    }

    static async register(credentials){
  const requiredFields=["email","password","rsvpstatus","numGuests"]
  requiredFields.forEach(field=>{
    if(!credentials.hasOwnProperty(field)){
        throw new BadRequestError('Missing ${field} in request body.')

    }
  })
  const existingUser=await user.fetchUserByEmail(credentials.email)
  if(existingUser){
    throw new BadRequestError('Duplicate email: ${credentials.email}')
  }
const lowercaseEmail=credentials.email.toLowerCase()
const result=await db.query(' INSERT INTO users(email,password,rsvp_status,num_guests,created_at) VALUES($1,$2,$3,$4) RETURNING id,email,rsvp_status,num_guests,created_at ',[lowercaseEmail,credentials.password,credentials.rsvpstatus,credentials.numGuests])
const user=result.rows[0]
return user

    }

    static async fetchUserByEmail(email){
        if(!email){
            throw new BadRequestError("No email provided")
        }
        const query='SELECT * FROM users WHERE email=$1'
        const result=await db.query(query,[email.toLowerCase()])
        const user=result.rows[0]
        return user
       }
}

module.exports=User