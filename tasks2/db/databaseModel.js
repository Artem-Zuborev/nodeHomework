const {Sequelize} = require("sequelize");

module.exports = function (sequelize) {
    return sequelize.define('User', {
        id: {type: Sequelize.STRING, primaryKey: true},
        login: Sequelize.STRING,
        password: Sequelize.STRING,
        age: Sequelize.INTEGER,
        isdeleted: Sequelize.BOOLEAN,
    }, {
        modelName: 'node',
        tableName: 'node',
        timestamps: false
    })
}
