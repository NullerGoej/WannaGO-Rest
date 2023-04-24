const Sequelize = require("sequelize");
const sequelize = new Sequelize('wannago', 'root', '', {
    host: "localhost",
    dialect: "mysql",
    port: 3306
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.contacts = require("./contact.model.js")(sequelize, Sequelize);
db.chips = require("./chip.model.js")(sequelize, Sequelize);

module.exports = db;