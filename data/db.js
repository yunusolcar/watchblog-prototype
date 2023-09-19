const config = require('../config');
const {Sequelize}=require('sequelize');

// const connection = mysql.createConnection(config.db);

// connection.connect(err => {
//      if (err) {
//           return console.log(err);
//      }
//      console.log("Db Connected");
//        module.exports = connection.promise();
// })

const sequelize = new Sequelize(config.db.database, config.db.user, config.db.password, {
     host: config.db.host,
     dialect: 'mysql'
});

async function connect() {
     try {
          await sequelize.authenticate();
          console.log("db connected :)");
     } catch (error) {
          console.log("db conn error", error);
     }
}
connect();

module.exports = sequelize;