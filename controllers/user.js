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
        const users = await db.User.findAll({
            attributes: {exclude: ['roleId']},
            include: {
              model: db.Role,
              attributes: [['role' ,'name']],
            },
            where: {
                [Op.or]: [
                    {username: {[Op.iLike]: '%' + userName + '%'}},
                    {email: {[Op.iLike]: '%' + userName + '%'}}
                ]
            }
        });
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
            attributes: {exclude: ['roleId']},
            ...paginate(pageSize, pageNumber),
            include: {
              model: db.Role,
              attributes: [['role' ,'name']],
            }
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
       const user = await db.User.findByPk(req.params.id, {
           attributes: {exclude: ['roleId']},
           include: {
              model: db.Role,
              attributes: [['role' ,'name']],
            }
       });
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
        
        const { username, email, password, role} = req.body;

        const roleExist = await db.Role.findOne({where: {role}});
        if(!roleExist) return res.json({message: 'role doesn\'t exist.'});

        await db.User.update({email, username, password, roleId: roleExist.id}, 
        {where: {id: req.params.id}})
        res.json({message: 'user is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createUser = async (req, res) => {
    try {
        const {username, password, email, role} = req.body;

        const roleExist = await db.Role.findOne({where: {role}});

        if(!roleExist) return res.json({message: 'role doesn\'t exist.'});

        const users = await db.User.create({username, password, email, roleId: roleExist.id});
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