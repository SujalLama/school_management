const { getAllClassrooms, createClassroom, updateClassroom, 
    deleteClassroom, getSingleClassroom} = require('../controllers/classroom');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(protect, getAllClassrooms)
    .post(protect, permit('admin'), createClassroom);

router.route('/:id')
    .get(getSingleClassroom)
    .put(protect, permit('admin'), updateClassroom)
    .delete(protect, permit('admin'), deleteClassroom);
    

module.exports = router