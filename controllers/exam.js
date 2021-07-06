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

const getAllExams = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const Exams = await db.Exam.findAndCountAll({
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(Exams.count / pageSize)
        res.json({
            Exams: Exams.rows,
            totalItems: Exams.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleExam = async (req, res) => {
    try {
       const Exam = await db.Exam.findByPk(req.params.id);
        res.json({Exam});
    } catch (error) {
        res.json({error});
    }
}

const updateExam = async (req, res) => {
    try {
       
        const { examTypeId, name, start_date} = req.body;

        await db.Exam.update({ examTypeId, name, start_date}, 
        {where: {id: req.params.id}})
        res.json({message: 'Exam is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createExam = async (req, res) => {
    try {
        const { examTypeId, name, start_date} = req.body;

        const Exams = await db.Exam.create({examTypeId, name, start_date});
        res.json({Exams});
    } catch (error) {
        res.json({error});
    }
}

const deleteExam = async (req, res) => {
    try {
        await db.Exam.destroy({where: {id: req.params.id}});
        res.json({message: 'Exam is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createExam, getAllExams, getSingleExam, deleteExam, updateExam};