const { getAllStudents, createStudent, updateStudent, 
    deleteStudent, getSingleStudent, searchStudentName } = require('../controllers/student');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(protect, getAllStudents)
    .post(protect, permit('admin'), createStudent);

router.route('/search').get(searchStudentName);

router.route('/:id')
    .get(getSingleStudent)
    .put(protect, permit('admin'), updateStudent)
    .delete(protect, permit('admin'), deleteStudent);
    

module.exports = router