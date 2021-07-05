const { Op } = require("sequelize");
const db = require("../models");
const errorHandler = require("../utils/errorHandler");

const paginate = (pageSize, pageNumber) => {
    const offset = (pageNumber - 1) * pageSize;
    const limit = pageSize 
    return {
        offset,
        limit
    }
}

const searchStudentName = async (req, res) => {
    try {
        const StudentName = req.query.studentname;
        const students = await db.Student.findAll({
            where: {
                [Op.or]: [
                    {fname: {[Op.iLike]: '%' + StudentName + '%'}},
                    {lname: {[Op.iLike]: '%' + StudentName + '%'}}
                ]
            }
        });
        res.json({students}).status(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllStudents = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const students = await db.Student.findAndCountAll({
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(students.count / pageSize)
        res.json({
            students: students.rows,
            totalItems: students.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleStudent = async (req, res) => {
    try {
       const student = await db.Student.findByPk(req.params.id);
        res.json({student});
    } catch (error) {
        res.json({error});
    }
}

const updateStudent = async (req, res) => {
    try {
       
        const { fname, lname, dob, phone, mobile, status} = req.body;

        await db.Student.update({fname, lname, dob, phone, mobile, status}, 
        {where: {id: req.params.id}})
        res.json({message: 'Student is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createStudent = async (req, res) => {
    try {
        const {userId} = req.body;

        const userExist = await db.User.findOne({where: {id: userId}});

        if(!userExist) return res.json({message: 'user doesn\'t exist.'});

        const Students = await db.Student.create(req.body);
        res.json({Students});
    } catch (error) {
        res.json({error});
    }
}

const deleteStudent = async (req, res) => {
    try {
        await db.Student.destroy({where: {id: req.params.id}});
        res.json({message: 'Student is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createStudent, getAllStudents, getSingleStudent, deleteStudent, updateStudent, searchStudentName};