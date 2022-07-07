const bcrypt = require("bcrypt");
const { unauthorizedError, BadRequestError } = require("../utils/errors");
const db = require("../db");
const { useScrollTrigger } = require("@material-ui/core");
const { BCRYPT_WORK_FACTOR } = require("../config");
class User {
  static async login(credentials) {
    const requiredFields = ["email", "password"];
    if (!credentials) {
      throw new BadRequestError("No credentials provided");
    }
    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError("Missing ${field} in request body.");
      }
    });
    const user = await user.fetchUserByEmail(credentials.email);
    if (user) {
      const isValid = await brypt.compare(credentials.password, user.password);
      if (isValid) {
        return user;
      }
    }
    throw new unauthorizedError("Invalid email/password");
  }

  static async register(credentials) {
    const requiredFields = [
      "email",
      "password",
      "first_name",
      "last_name",
      "location",
      "date",
    ];

    requiredFields.forEach((field) => {
      if (!credentials.hasOwnProperty(field)) {
        throw new BadRequestError(`Missing ${field} in request body.`);
      }
    });
    const existingUser = await User.fetchUserByEmail(credentials.email);
    if (existingUser) {
      throw new BadRequestError("Duplicate email: ${credentials.email}");
    }
    const hashedPassword = await bcrypt.hash(
      credentials.password,
      BCRYPT_WORK_FACTOR
    );
    const lowercaseEmail = credentials.email.toLowerCase();
    const result = await db.query(
      ` INSERT INTO users(email,password,first_name,last_name,location,date) VALUES($1,$2,$3,$4,$5,$6) RETURNING id,email,first_name,last_name,location,date`,
      [
        lowercaseEmail,
        hashedPassword,
        credentials.first_name,
        credentials.last_name,
        credentials.location,
        credentials.date,
      ]
    );
    const user = result.rows[0];
    return user;
  }

  static async fetchUserByEmail(email) {
    if (!email) {
      throw new BadRequestError("No email provided");
    }
    const query = "SELECT * FROM users WHERE email=$1";
    const result = await db.query(query, [email.toLowerCase()]);
    const user = result.rows[0];
    return user;
  }
}

module.exports = User;
