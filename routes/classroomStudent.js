const { getAllClassroomStudents, createClassroomStudent, updateClassroomStudent, 
    deleteClassroomStudent, getSingleClassroomStudent} = require('../controllers/classroomStudent');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(protect, getAllClassroomStudents)
    .post(protect, permit('admin'), createClassroomStudent);

router.route('/:id')
    .get(getSingleClassroomStudent)
    .put(protect, permit('admin'), updateClassroomStudent)
    .delete(protect, permit('admin'), deleteClassroomStudent);
    

module.exports = router