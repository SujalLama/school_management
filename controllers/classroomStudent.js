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

const getAllClassroomStudents = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const classroomStudents = await db.ClassroomStudent.findAndCountAll({
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(classroomStudents.count / pageSize)
        res.json({
            classroomStudents: classroomStudents.rows,
            totalItems: classroomStudents.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleClassroomStudent = async (req, res) => {
    try {
       const classroomStudent = await db.ClassroomStudent.findByPk(req.params.id);
        res.json({classroomStudent});
    } catch (error) {
        res.json({error});
    }
}

const updateClassroomStudent = async (req, res) => {
    try {
       
        const { classroomId, studentId} = req.body;

        await db.ClassroomStudent.update({ classroomId, studentId}, 
        {where: {id: req.params.id}})
        res.json({message: 'ClassroomStudent is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createClassroomStudent = async (req, res) => {
    try {
        const { classroomId, studentId} = req.body;

        const ClassroomStudents = await db.ClassroomStudent.create({classroomId, studentId});
        res.json({ClassroomStudents});
    } catch (error) {
        res.json({error});
    }
}

const deleteClassroomStudent = async (req, res) => {
    try {
        await db.ClassroomStudent.destroy({where: {id: req.params.id}});
        res.json({message: 'ClassroomStudent is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createClassroomStudent, getAllClassroomStudents, getSingleClassroomStudent, deleteClassroomStudent, updateClassroomStudent};