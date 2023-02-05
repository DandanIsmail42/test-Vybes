import express from "express";
import {
    getEmployee,
    getEmployeeById,
    createEmployee,
    updateEmployee,
    deletedEmployee
} from "../controllers/Employee.js";
import { verifyUser } from "../middleware/AuthUser.js";

const router = express.Router();

router.get('/employee',verifyUser, getEmployee);
router.get('/employee/:id',verifyUser, getEmployeeById);
router.post('/employee',verifyUser, createEmployee);
router.patch('/employee/:id',verifyUser, updateEmployee);
router.delete('/employee/:id',verifyUser, deletedEmployee);

export default router;