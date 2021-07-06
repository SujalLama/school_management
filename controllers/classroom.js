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

const getAllClassrooms = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const classrooms = await db.Classroom.findAndCountAll({
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(classrooms.count / pageSize)
        res.json({
            classrooms: classrooms.rows,
            totalItems: classrooms.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleClassroom = async (req, res) => {
    try {
       const classroom = await db.Classroom.findByPk(req.params.id);
        res.json({classroom});
    } catch (error) {
        res.json({error});
    }
}

const updateClassroom = async (req, res) => {
    try {
       
        const { year, section, remarks, teacherId, status, gradeId} = req.body;

        await db.Classroom.update({ year, section, remarks, teacherId, status, gradeId}, 
        {where: {id: req.params.id}})
        res.json({message: 'Classroom is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createClassroom = async (req, res) => {
    try {
        const { year, section, remarks, teacherId, status, gradeId} = req.body;

        const Classrooms = await db.Classroom.create({year, section, remarks, teacherId, status, gradeId});
        res.json({Classrooms});
    } catch (error) {
        res.json({error});
    }
}

const deleteClassroom = async (req, res) => {
    try {
        await db.Classroom.destroy({where: {id: req.params.id}});
        res.json({message: 'Classroom is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createClassroom, getAllClassrooms, getSingleClassroom, deleteClassroom, updateClassroom};