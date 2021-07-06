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

const getAllAttendances = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const Attendances = await db.Attendance.findAndCountAll({
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(Attendances.count / pageSize)
        res.json({
            Attendances: Attendances.rows,
            totalItems: Attendances.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleAttendance = async (req, res) => {
    try {
       const Attendance = await db.Attendance.findByPk(req.params.id);
        res.json({Attendance});
    } catch (error) {
        res.json({error});
    }
}

const updateAttendance = async (req, res) => {
    try {
       
        const { date, remarks, status, studentId} = req.body;

        await db.Attendance.update({ date, remarks, studentId, status}, 
        {where: {id: req.params.id}})
        res.json({message: 'Attendance is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createAttendance = async (req, res) => {
    try {
        const { date, remarks, status, studentId} = req.body;

        const Attendances = await db.Attendance.create({ date, remarks, studentId, status});
        res.json({Attendances});
    } catch (error) {
        res.json({error});
    }
}

const deleteAttendance = async (req, res) => {
    try {
        await db.Attendance.destroy({where: {id: req.params.id}});
        res.json({message: 'Attendance is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createAttendance, getAllAttendances, getSingleAttendance, deleteAttendance, updateAttendance};