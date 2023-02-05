import Employee from "../models/EmployeeModel.js";
import User from "../models/UserModel.js";
import {Op} from "sequelize";

export const getEmployee = async (req, res) =>{
    try {
        let response;
        if(req.role === "admin"){
            response = await Employee.findAll({
                attributes:['uuid','name', 'address','salary', 'email'],
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Employee.findAll({
                attributes:['uuid','name','salary', 'email'],
                where:{
                    userId: req.userId
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const getEmployeeById = async(req, res) =>{
    try {
        const employee = await Employee.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!employee) return res.status(404).json({msg: "Data tidak ditemukan"});
        let response;
        if(req.role === "admin"){
            response = await Employee.findOne({
                attributes:['uuid','name','salary', 'email'],
                where:{
                    id: employee.id
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }else{
            response = await Employee.findOne({
                attributes:['uuid','name', 'address','salary', 'email'],
                where:{
                    [Op.and]:[{id: employee.id}, {userId: req.userId}]
                },
                include:[{
                    model: User,
                    attributes:['name','email']
                }]
            });
        }
        res.status(200).json(response);
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const createEmployee = async(req, res, next) =>{
    const {name, salary, address, email} = req.body;
    try {
              await Employee.create({
            name: name,
            salary: salary,
            address: address,
            email: email,
            userId: req.userId
        });
        res.status(201).json({msg: "Employee Created Successfuly"});
        
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const updateEmployee = async(req, res) =>{
    try {
        const employee = await Employee.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!employee) return res.status(404).json({msg: "Data tidak ditemukan"});
        const {name, salary, address, email} = req.body;
        if(req.role === "admin"){
           await Employee.update({name, address, salary, email}, {
            where: {
                id: employee.id
            }
           })
        }else{
            if(req.userId !== employee.userId) return res.status(403).json({msg: 'Akses terlarang'})
            await Employee.update({name, address, salary, email}, {
                where:{
                    [Op.and]:[{id: employee.id}, {userId: req.userId}]
                },
               })
        }
        res.status(200).json({msg: "Employee updated successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}

export const deletedEmployee = async(req, res) =>{
    try {
        const employee = await Employee.findOne({
            where:{
                uuid: req.params.id
            }
        });
        if(!employee) return res.status(404).json({msg: "Data tidak ditemukan"});
        if(req.role === "admin"){
            await Employee.destroy({
                where:{
                    id: employee.id
                }
            });
        }else{
            if(req.userId !== employee.userId) return res.status(403).json({msg: "Akses terlarang"});
            await Employee.destroy({
                where:{
                    [Op.and]:[{id: employee.id}, {userId: req.userId}]
                }
            });
        }
        res.status(200).json({msg: "Employee deleted successfuly"});
    } catch (error) {
        res.status(500).json({msg: error.message});
    }
}