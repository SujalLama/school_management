const db = require('../models');
module.exports = (role) => {
       
    return async (req, res, next)  => {
        try {
             const roleExist = await db.Role.findOne({where: {role}});
                if(!roleExist) return res.json({message: "role doensn\'t exists."})
                if(roleExist.id === req.user.roleId) {
                    next();
                } else {
                    res.json({message: "permission not granted."})
                }   
        } catch (error) {
            res.json(error)
        }
    }
}