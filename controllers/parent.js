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

const searchParentName = async (req, res) => {
    try {
        const parentName = req.query.parentname;
        const parents = await db.Parent.findAll({
            where: {
                [Op.or]: [
                    {fname: {[Op.iLike]: '%' + parentName + '%'}},
                    {lname: {[Op.iLike]: '%' + parentName + '%'}}
                ]
            }
        });
        res.json({parents}).status(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllParents = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const parents = await db.Parent.findAndCountAll({
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(parents.count / pageSize)
        res.json({
            parents: parents.rows,
            totalItems: parents.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleParent = async (req, res) => {
    try {
       const parent = await db.Parent.findByPk(req.params.id);
        res.json({parent});
    } catch (error) {
        res.json({error});
    }
}

const updateParent = async (req, res) => {
    try {
       
        const { fname, lname, dob, phone, mobile, status} = req.body;

        await db.Parent.update({fname, lname, dob, phone, mobile, status}, 
        {where: {id: req.params.id}})
        res.json({message: 'Parent is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createParent = async (req, res) => {
    try {
        const {fname, lname, dob, phone, mobile, userId} = req.body;

        const userExist = await db.User.findOne({where: {id: userId}});

        if(!userExist) return res.json({message: 'user doesn\'t exist.'});

        const parents = await db.Parent.create(req.body);
        res.json({parents});
    } catch (error) {
        res.json({error});
    }
}

const deleteParent = async (req, res) => {
    try {
        await db.Parent.destroy({where: {id: req.params.id}});
        res.json({message: 'Parent is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createParent, getAllParents, getSingleParent, deleteParent, updateParent, searchParentName};