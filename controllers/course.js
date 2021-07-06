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

const getAllCourses = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const Courses = await db.Course.findAndCountAll({
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(Courses.count / pageSize)
        res.json({
            Courses: Courses.rows,
            totalItems: Courses.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleCourse = async (req, res) => {
    try {
       const Course = await db.Course.findByPk(req.params.id);
        res.json({Course});
    } catch (error) {
        res.json({error});
    }
}

const updateCourse = async (req, res) => {
    try {
       
        const { name, description, gradeId} = req.body;

        await db.Course.update({ name, description, gradeId}, 
        {where: {id: req.params.id}})
        res.json({message: 'Course is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createCourse = async (req, res) => {
    try {
        const { name, description, gradeId} = req.body;

        const Courses = await db.Course.create({name, description, gradeId});
        res.json({Courses});
    } catch (error) {
        res.json({error});
    }
}

const deleteCourse = async (req, res) => {
    try {
        await db.Course.destroy({where: {id: req.params.id}});
        res.json({message: 'Course is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createCourse, getAllCourses, getSingleCourse, deleteCourse, updateCourse};