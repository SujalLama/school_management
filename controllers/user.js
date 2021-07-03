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

const searchUserName = async (req, res) => {
    try {
        const userName = req.query.username;
        const users = await db.User.findAll({where: {name: {[Op.iLike]: '%' + userName + '%'}}});
        res.json({users}).status(200);
    } catch (error) {
        res.status(500).json(error);
    }
}

const getAllUsers = async (req, res) => {
    try {
        const pageSize = 10;
        const pageNumber = Number(req.query.pageNumber) || 1;
        const users = await db.User.findAndCountAll({
            ...paginate(pageSize, pageNumber),
            });
            const totalPages = Math.ceil(users.count / pageSize)
        res.json({
            users: users.rows,
            totalItems: users.count,
            totalPages, 
            pageNumber, 
            pageSize
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleUser = async (req, res) => {
    try {
       const user = await db.User.findByPk(req.params.id);
        res.json({user});
    } catch (error) {
        res.json({error});
    }
}

const updateUser = async (req, res) => {
    try {
         let filename = ''
        if(req.file) {
            filename = req.file.filename
        }
        
        const { username, email, password} = req.body;

        await db.User.update({email, username, password}, 
        {where: {id: req.params.id}})
        res.json({message: 'user is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createUser = async (req, res) => {
    try {
        const {username, password, email} = req.body;
        const users = await db.User.create({username, password, email});
        res.json({users});
    } catch (error) {
        res.json({error: errorHandler(error)});
    }
}

const deleteUser = async (req, res) => {
    try {
        await db.User.destroy({where: {id: req.params.id}});
        res.json({message: 'user is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createUser, getAllUsers, getSingleUser, deleteUser, updateUser, searchUserName};