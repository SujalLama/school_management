const db = require("../models");
const errHandler = require('../utils/errorHandler');
const bcrypt = require('bcryptjs');

const login = async (req, res) => {
    try {
        const {password, email} = req.body;
        if(!password || !email) return res.status(400).json({message: 'Empty password or username.'});
        
        const user = await db.User.findOne({where: {email}});
        if(!user) {
            return res.status(400).json({message: 'Invalid password or username.'})
        }

        // checking password
        if(!bcrypt.compareSync(password, user.password)) {
            return res.status(400).json({message: 'Invalid password or username.'})
        }

        const token = user.generateToken();

        res.status(200).json({token});
    } catch (error) {
        res.status(400).json({error})
    }
}

const register = async (req, res) => {
    try {
        const {email, password, username, role} = req.body
        const userExist = await db.User.findOne({where: {email}});

        const roleExist = await db.Role.findOne({where: {role}});

        if(!roleExist) {
            return res.status(400).json({message: 'Role doesn\'t exists.'})
        }

        if(userExist) {
            return res.status(400).json({message: 'You have already registered.'})
        }

        if(password.length < 5 && password.length < 50) {
            return res.status(400).json({message: "Password must be greater than 5."})
        }
        
        const user = await db.User.create({email, password, username, roleId: roleExist.id});
        const token = user.generateToken();
        res.status(200).json({token});
    } catch (error) {
        const err = errHandler(error);
        res.status(400).json({error: err})
    }
}

module.exports = {register, login};