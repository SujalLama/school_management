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

const searchTeacherName = async (req, res) => {
    try {
        const teacherName = req.query.teachername;
        const teachers = await db.Parent.findAll({
            where: {
                [Op.or]: [
                    {fname: {[Op.iLike]: '%' + teacherName + '%'}},
                    {lname: {[Op.iLike]: '%' + teacherName + '%'}}
                ]
            }
        });
        res.json({teachers}).status(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllTeachers = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const teachers = await db.Teacher.findAndCountAll({
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(teachers.count / pageSize)
        res.json({
            teachers: teachers.rows,
            totalItems: teachers.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleTeacher = async (req, res) => {
    try {
       const teacher = await db.Teacher.findByPk(req.params.id);
        res.json({teacher});
    } catch (error) {
        res.json({error});
    }
}

const updateTeacher = async (req, res) => {
    try {
       
        const { fname, lname, dob, phone, mobile, status} = req.body;

        await db.Teacher.update({fname, lname, dob, phone, mobile, status}, 
        {where: {id: req.params.id}})
        res.json({message: 'Teacher is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createTeacher = async (req, res) => {
    try {
        const {fname, lname, dob, phone, mobile, userId} = req.body;

        const userExist = await db.User.findOne({where: {id: userId}});

        if(!userExist) return res.json({message: 'user doesn\'t exist.'});

        const teachers = await db.Teacher.create(req.body);
        res.json({teachers});
    } catch (error) {
        res.json({error});
    }
}

const deleteTeacher = async (req, res) => {
    try {
        await db.Teacher.destroy({where: {id: req.params.id}});
        res.json({message: 'Teacher is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createTeacher, getAllTeachers, getSingleTeacher, deleteTeacher, updateTeacher, searchTeacherName};