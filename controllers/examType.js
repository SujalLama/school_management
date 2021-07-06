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

const getAllExamTypes = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const ExamTypes = await db.ExamType.findAndCountAll({
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(ExamTypes.count / pageSize)
        res.json({
            ExamTypes: ExamTypes.rows,
            totalItems: ExamTypes.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleExamType = async (req, res) => {
    try {
       const ExamType = await db.ExamType.findByPk(req.params.id);
        res.json({ExamType});
    } catch (error) {
        res.json({error});
    }
}

const updateExamType = async (req, res) => {
    try {
       
        const { name, desc} = req.body;

        await db.ExamType.update({ name, desc}, 
        {where: {id: req.params.id}})
        res.json({message: 'ExamType is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createExamType = async (req, res) => {
    try {
        const { name, desc} = req.body;

        const ExamTypes = await db.ExamType.create({name, desc});
        res.json({ExamTypes});
    } catch (error) {
        res.json({error});
    }
}

const deleteExamType = async (req, res) => {
    try {
        await db.ExamType.destroy({where: {id: req.params.id}});
        res.json({message: 'ExamType is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createExamType, getAllExamTypes, getSingleExamType, deleteExamType, updateExamType};