const express = require('express');
const router = express.Router();
const {
	getAllTasks,
	getSingleTasks,
	createTask,
	deleteTask,
	updateTasks
} = require('../controllers/tasks');


router.route('/').get(getAllTasks).post(createTask);
router.route('/:id').get(getSingleTasks).delete(deleteTask).patch(updateTasks);


module.exports = router;