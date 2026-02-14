const express = require('express');
const router = express.Router();
const {
  getUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  exportUsersCSV,
} = require('../controllers/userController');

router.route('/')
  .get(getUsers)
  .post(createUser);

router.route('/export/csv')
  .get(exportUsersCSV);

router.route('/:id')
  .get(getUserById)
  .put(updateUser)
  .delete(deleteUser);

module.exports = router;