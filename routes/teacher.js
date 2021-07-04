const { getAllTeachers, createTeacher, updateTeacher, 
    deleteTeacher, getSingleTeacher, searchTeacherName } = require('../controllers/teacher');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(protect, getAllTeachers)
    .post(protect, permit('admin'), createTeacher);

router.route('/search').get(searchTeacherName);

router.route('/:id')
    .get(getSingleTeacher)
    .put(protect, permit('admin'), updateTeacher)
    .delete(protect, permit('admin'), deleteTeacher);
    

module.exports = router