const db = require("../db");
const ExpressError = require("../expressError");
const bcrypt = require("bcrypt");
const { BCRYPT_WORK_FACTOR } = require("../config");

class User {

    static async get(username) {
        const result = await db.query(`
        SELECT username, email
        FROM users
        WHERE username = $1`,
        [username]
        );
        return result.rows[0];
    }

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
    static checkRegisterPasswordsMatch(password, confirmPassword) {
        return password === confirmPassword ? true : false;
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
        if (!user) return false;
        
        return await bcrypt.compare(password, user.password)
    }

    static async createGoal(username, body) {
        try {
            let goalId;
            let currentMilestoneId;
            for (const property in body) {
                // Goal Insertions
                if (property === "goal-title") {
                    let result = await db.query(`
                    INSERT INTO goals (username, goal_name)
                    VALUES ($1, $2)
                    RETURNING id`,
                    [username, body[property]]
                );
                goalId = result.rows[0];

                // Milestone Insertions
                } else if (property.indexOf("milestone-") > -1 && property.indexOf("-title") > -1) {
                    let sequence = property.split("-")[1];
                    let result = await db.query(`
                        INSERT INTO milestones (goal_id, milestone_name, sequence)
                        VALUES ($1, $2, $3)
                        RETURNING id`,
                        [goalId.id, body[property], sequence]
                    );
                    currentMilestoneId = result.rows[0];
    
                // Task Insertions
                } else if (property.indexOf("task") > -1) {
                    let sequence = property.split("-")[3];
                    let result = await db.query(`
                        INSERT INTO tasks (milestone_id, task_name, sequence)
                        VALUES ($1, $2, $3)
                        RETURNING id`,
                        [currentMilestoneId.id, body[property], sequence]
                    );
                }
            }
        } catch(err) {
            throw new ExpressError("Invalid creation", 400);
        }
        console.log("creation successful");
        return true;
    }
}

module.exports = User;
