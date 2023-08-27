const {
     Sequelize
} = require("sequelize")
const config = require('../config')

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
     dialect: 'mysql',
     host: config.db.host,
     define: {
          timestamps: false
     }
});

/*
Old Connection

const connection = mysql.createConnection(config.db)
connection.connect(err => {
     if (err) {
          return console.log(err)
     }
     console.log("Db Connected")
})

module.exports = connection.promise()
*/
async function connect() {
     try {
          await sequelize.authenticate()
          console.log("Db Connected :)");
     } catch (err) {
          console.log(err);
     }
}
connect()

module.exports = sequelize