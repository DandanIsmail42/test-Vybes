import {Sequelize} from "sequelize";

const db = new Sequelize('company', 'root', 'root', {
    host: "localhost",
    dialect: "mysql"
});

export default db;