// Config data

const DB_URI = process.env.DATABASE_URL || "postgresql://postgres:developer@localhost:5432/goaltracker"
const BCRYPT_WORK_FACTOR = 12;

module.exports = {
    DB_URI,
    BCRYPT_WORK_FACTOR
}