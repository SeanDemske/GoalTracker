// Config data

const DB_URI = process.env.DATABASE_URL || "postgresql://postgres:ginger16@localhost:5432/goaltracker"
const BCRYPT_WORK_FACTOR = 12;
const SECRET_KEY = process.env.SECRET_KEY || "secret";

module.exports = {
    DB_URI,
    BCRYPT_WORK_FACTOR,
    SECRET_KEY
}