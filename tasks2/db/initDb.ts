import { Sequelize } from "sequelize";
import User from "../entities/user.entities";
import  Group  from "../entities/group.entities"
import UserGroup from "../entities/userGroup.entities"
import { config } from "../config/db.config";


const sequelize = new Sequelize({
    database: config.database,
    username: config.username,
    password: config.password,
    host: config.host,
    port: 5432,
    dialect: "postgres",
    dialectOptions: {
        ssl: {
            require: true,
            rejectUnauthorized: false
        }
    },
});
const user = User(sequelize);
const group = Group(sequelize);
const userGroup = UserGroup(sequelize)

async function initDB() {
    user.belongsToMany(group, {
        through: userGroup,
        as: 'userId',
        foreignKey: 'userId'
    });
    group.belongsToMany(user, {
        through: userGroup,
        as: 'groupId',
        foreignKey: 'groupId'
    });
    await sequelize.sync();
    await user.sync();
    await group.sync();
    await userGroup.sync();
}
initDB().then()

export default {
    sequelize: sequelize,
    user: User(sequelize),
    group: Group(sequelize),
    userGroup: UserGroup(sequelize)
}
