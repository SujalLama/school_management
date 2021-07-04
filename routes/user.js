const { getAllUsers, createUser, updateUser, deleteUser, getSingleUser, searchUserName } = require('../controllers/user');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(protect, getAllUsers)
    .post(protect, permit('admin'), createUser);

router.route('/search').get(searchUserName);

router.route('/:id')
    .get(getSingleUser)
    .put(protect, permit('admin'), updateUser)
    .delete(protect, permit('admin'), deleteUser);
    

module.exports = router