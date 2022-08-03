import { DataTypes } from 'sequelize';

export default function (sequelize) {
    return sequelize.define('UserGroup', {
        id: {
            type: DataTypes.STRING,
            defaultValue: DataTypes.UUIDV4,
            allowNull: false,
            primaryKey: true,
            unique: true
        }
    });
}
