import { DataTypes } from 'sequelize';

export default function (sequelize) {
    return sequelize.define('groups', {
            id: {
                type: DataTypes.STRING,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
                primaryKey: true,
                unique: true
            },
            name: DataTypes.STRING,
            permissions: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false
            }
        },
        {
            timestamps: false
        });
}
