const { getAllRoles, createRole, updateRole, 
    deleteRole, getSingleRole} = require('../controllers/role');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(getAllRoles)
    .post(protect, permit('admin'), createRole);

router.route('/:id')
    .get(getSingleRole)
    .put(protect, permit('admin'), updateRole)
    .delete(protect, permit('admin'), deleteRole);
    

module.exports = router