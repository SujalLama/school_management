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

const getAllGrades = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const grades = await db.Grade.findAndCountAll({
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(grades.count / pageSize)
        res.json({
            grades: grades.rows,
            totalItems: grades.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleGrade = async (req, res) => {
    try {
       const grade = await db.Grade.findByPk(req.params.id);
        res.json({grade});
    } catch (error) {
        res.json({error});
    }
}

const updateGrade = async (req, res) => {
    try {
       
        const { name, desc} = req.body;

        await db.Grade.update({ name, desc}, 
        {where: {id: req.params.id}})
        res.json({message: 'Grade is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createGrade = async (req, res) => {
    try {
        const { name, desc} = req.body;

        const Grades = await db.Grade.create({name, desc});
        res.json({Grades});
    } catch (error) {
        res.json({error});
    }
}

const deleteGrade = async (req, res) => {
    try {
        await db.Grade.destroy({where: {id: req.params.id}});
        res.json({message: 'Grade is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createGrade, getAllGrades, getSingleGrade, deleteGrade, updateGrade};