import { Sequelize } from "sequelize";
import db from "../config/Database.js";
import Users from "./UserModel.js";

const {DataTypes} = Sequelize;

const Employee = db.define('employee',{
    uuid:{
        type: DataTypes.STRING,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true
        }
    },
    name:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            len: [3, 100]
        }
    },
    address:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            len: [3, 200]
        }
    },
     salary:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true
        }
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true,
            isEmail: true
        }
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false,
        unique: true,
        validate:{
            notEmpty: true
        }
    }
},{
    freezeTableName: true
});

Users.hasMany(Employee);
Employee.belongsTo(Users, {foreignKey: 'userId'});

export default Employee;