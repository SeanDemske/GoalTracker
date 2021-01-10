// Config data

const DB_URI = process.env.DATABASE_URL || "postgresql://postgres:developer@localhost:5432/goaltracker"

module.exports = {
    DB_URI
}