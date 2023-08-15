const mysql = require('mysql2')
const config = require('../config')

const connection = mysql.createConnection(config.db)
connection.connect(err => {
     if (err) {
          return console.log(err)
     }
     console.log("Db Connected")
})

module.exports = connection.promise()