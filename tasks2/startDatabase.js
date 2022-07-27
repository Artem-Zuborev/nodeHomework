const db = require ('./db/index')
const sequelize = db.sequelize

const sequelizeConnection = async () => {
    try {
        sequelize
            .authenticate()
            .then(() => {

                console.log('Postgres connection has been established successfully.')
            })
    } catch (error) {
        console.error('Unable to connect to the database:', error)
    }}
sequelizeConnection().then()
