const { getAllExamTypes, createExamType, updateExamType, 
    deleteExamType, getSingleExamType} = require('../controllers/examType');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(protect, getAllExamTypes)
    .post(protect, permit('admin'), createExamType);

router.route('/:id')
    .get(getSingleExamType)
    .put(protect, permit('admin'), updateExamType)
    .delete(protect, permit('admin'), deleteExamType);
    

module.exports = router