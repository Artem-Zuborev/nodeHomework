import {Sequelize} from "sequelize";
import User from "../entities/user.entities";


const sequelize = new Sequelize({
    database: "doeporbf4u73q",
    username: "adesplbadfjaza",
    password: "acbad72104c4a41f382ceecae7850aff442e9c1219c3d330a6ae1feafd4f2ee3",
    host: "ec2-54-77-40-202.eu-west-1.compute.amazonaws.com",
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});

export default {
    sequelize: sequelize,
    user: User(sequelize)
}
