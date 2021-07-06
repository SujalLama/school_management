const { getAllExamResults, createExamResult, updateExamResult, 
    deleteExamResult, getSingleExamResult} = require('../controllers/examResult');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(protect, getAllExamResults)
    .post(protect, permit('admin'), createExamResult);

router.route('/:id')
    .get(getSingleExamResult)
    .put(protect, permit('admin'), updateExamResult)
    .delete(protect, permit('admin'), deleteExamResult);
    

module.exports = router