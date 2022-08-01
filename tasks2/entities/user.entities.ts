import { DataTypes } from "sequelize";

export default function (sequelize) {
    return sequelize.define('User', {
        id: {type: DataTypes.STRING, primaryKey: true},
        login: DataTypes.STRING,
        password: DataTypes.STRING,
        age: DataTypes.INTEGER,
        isdeleted: DataTypes.BOOLEAN,
    }, {
        modelName: 'node',
        tableName: 'node',
        timestamps: false
    })
}
