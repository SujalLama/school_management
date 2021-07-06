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

const getAllExamResults = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const ExamResults = await db.ExamResult.findAndCountAll({
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(ExamResults.count / pageSize)
        res.json({
            ExamResults: ExamResults.rows,
            totalItems: ExamResults.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleExamResult = async (req, res) => {
    try {
       const ExamResult = await db.ExamResult.findByPk(req.params.id);
        res.json({ExamResult});
    } catch (error) {
        res.json({error});
    }
}

const updateExamResult = async (req, res) => {
    try {
       
        const { examId, studentId, courseId, marks} = req.body;

        await db.ExamResult.update({ examId, studentId, courseId, marks}, 
        {where: {id: req.params.id}})
        res.json({message: 'ExamResult is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createExamResult = async (req, res) => {
    try {
        const { examId, studentId, courseId, marks} = req.body;

        const ExamResults = await db.ExamResult.create({examId, studentId, courseId, marks});
        res.json({ExamResults});
    } catch (error) {
        res.json({error});
    }
}

const deleteExamResult = async (req, res) => {
    try {
        await db.ExamResult.destroy({where: {id: req.params.id}});
        res.json({message: 'ExamResult is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createExamResult, getAllExamResults, getSingleExamResult, deleteExamResult, updateExamResult};