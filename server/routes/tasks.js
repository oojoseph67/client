const express = require('express')
const router = express.Router()

const {
    getAllTasks,
    getTaskById,
    createTask,
    updateTask,
    deleteTask,
} = require('../controllers/tasks.js')

router.route('/').get(getAllTasks).post(createTask)
router.route('/:id').get(getTaskById).patch(updateTask).delete(deleteTask)

module.exports = router