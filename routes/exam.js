const { getAllExams, createExam, updateExam, 
    deleteExam, getSingleExam} = require('../controllers/exam');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(protect, getAllExams)
    .post(protect, permit('admin'), createExam);

router.route('/:id')
    .get(getSingleExam)
    .put(protect, permit('admin'), updateExam)
    .delete(protect, permit('admin'), deleteExam);
    

module.exports = router