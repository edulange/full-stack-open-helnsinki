require('dotenv').config()

const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI

const config = require('./utils/config')

logger.info(`Server running on port ${config.PORT}`)

module.exports = {
  MONGODB_URI,
  PORT
}