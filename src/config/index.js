/* eslint-disable no-undef */
const dotenv = require("dotenv")

dotenv.config()

const PORT = process.env.PORT
const DATABASE_URL = process.env.DATABASE_URL
const SECRET_KEY = process.env.SECRET_KEY

module.exports.PORT = PORT
module.exports.DATABASE_URL = DATABASE_URL
module.exports.SECRET_KEY = SECRET_KEY
module.exports = { PORT, DATABASE_URL, SECRET_KEY }
