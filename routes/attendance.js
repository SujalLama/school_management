const { getAllAttendances, createAttendance, updateAttendance, 
    deleteAttendance, getSingleAttendance} = require('../controllers/attendance');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(protect, getAllAttendances)
    .post(protect, permit('admin'), createAttendance);

router.route('/:id')
    .get(getSingleAttendance)
    .put(protect, permit('admin'), updateAttendance)
    .delete(protect, permit('admin'), deleteAttendance);
    

module.exports = router