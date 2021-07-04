const db = require("../models");
const errorHandler = require("../utils/errorHandler");

const getAllRoles = async (req, res) => {
    try {
        const roles = await db.Role.findAll({});
        res.json({
            roles
        }).status(200);
    } catch (error) {
        res.json({error});
    }
}

const getSingleRole = async (req, res) => {
    try {
       const role = await db.Role.findByPk(req.params.id);
        res.json({role});
    } catch (error) {
        res.json({error});
    }
}

const updateRole = async (req, res) => {
    try {
        const {role} = req.body;

        await db.Role.update({role}, 
        {where: {id: req.params.id}})
        res.json({message: 'Role is successfully updated.'});

    } catch (error) {
        res.json({error});
    }
}

const createRole = async (req, res) => {
    try {
        const {role} = req.body;
        await db.Role.create({role});
        res.json({message: 'role is created.'});
    } catch (error) {
        res.json({error: errorHandler(error)});
    }
}

const deleteRole = async (req, res) => {
    try {
        await db.Role.destroy({where: {id: req.params.id}});
        res.json({message: 'Role is successfully deleted.'});

    } catch (error) {
        res.json({error});
    }
}

module.exports = {createRole, getAllRoles, getSingleRole, deleteRole, updateRole};