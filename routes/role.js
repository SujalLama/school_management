const { getAllRoles, createRole, updateRole, 
    deleteRole, getSingleRole} = require('../controllers/role');

const router = require('express').Router();

router.route('/')
    .get(getAllRoles)
    .post( createRole);

router.route('/:id')
    .get(getSingleRole)
    .put( updateRole)
    .delete(deleteRole);
    

module.exports = router