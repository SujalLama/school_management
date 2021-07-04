const { getAllParents, createParent, updateParent, 
    deleteParent, getSingleParent, searchParentName } = require('../controllers/parent');

const router = require('express').Router();
const protect = require('../middleware/authMiddleware');
const permit = require('../middleware/permissionAuth');

router.route('/')
    .get(protect, getAllParents)
    .post(protect, permit('admin'), createParent);

router.route('/search').get(searchParentName);

router.route('/:id')
    .get(getSingleParent)
    .put(protect, permit('admin'), updateParent)
    .delete(protect, permit('admin'), deleteParent);
    

module.exports = router