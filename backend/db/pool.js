const mysql = require('mysql2')
require('dotenv').config({ path: 'process.env' })

const connection = mysql.createPool({
  connectionLimit: 10,
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USERNAME,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
})

module.exports = connection
