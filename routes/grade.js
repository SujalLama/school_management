const { getAllGrades, createGrade, updateGrade, 
    deleteGrade, getSingleGrade} = require('../controllers/grade');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(protect, getAllGrades)
    .post(protect, permit('admin'), createGrade);

router.route('/:id')
    .get(getSingleGrade)
    .put(protect, permit('admin'), updateGrade)
    .delete(protect, permit('admin'), deleteGrade);
    

module.exports = router