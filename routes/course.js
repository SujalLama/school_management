const { getAllCourses, createCourse, updateCourse, 
    deleteCourse, getSingleCourse} = require('../controllers/course');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(protect, getAllCourses)
    .post(protect, permit('admin'), createCourse);

router.route('/:id')
    .get(getSingleCourse)
    .put(protect, permit('admin'), updateCourse)
    .delete(protect, permit('admin'), deleteCourse);
    

module.exports = router