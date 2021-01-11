const db = require("../db");
const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {

    // Inserts user into database and returns user object { username: "exampleuser", email: "example@email.com" }
    static async register({ username, password, email }) {
        let hashedPassword = await bcrypt.hash(password, BCRYPT_WORK_FACTOR);
        const result = await db.query(
            `INSERT INTO users (username, password, email)
            VALUES ($1, $2, $3)
            RETURNING username, email`,
            [username, hashedPassword, email]
        );
        const user = result.rows[0];
        if (!user) {
          return next(new ExpressError("Invalid request", 400));
        }
        return user;
    }

    // If both passwords match return true else return passwords must match error
    static checkRegisterPasswordsMatch(password, confirmPassword, next) {
        return password === confirmPassword ? true : next(new ExpressError("Passwords must match", 400));
    }

    // Grabs user from sql query and compares input password with hashed password to authenticate. 
    // Returns true if authenticated, false if not
    static async authenticate(username, password) {
        const result = await db.query(
            `SELECT username, password
            FROM users
            WHERE username = $1`,
            [username]
        );
        const user = result.rows[0];
        return await bcrypt.compare(password, user.password)
    }
}

module.exports = User;
