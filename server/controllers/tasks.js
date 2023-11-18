const Task = require("../modules/tasks");

const getAllTasks = (req, res) => {
  res.send("all items from the file");
};

const getTaskById = (req, res) => {
  // res.send('task by id')
  let taskId = req.params.id;
  res.json(taskId);
};

const createTask = async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
};

const updateTask = (req, res) => {
  res.send("update task");
};

const deleteTask = (req, res) => {
  res.send("delete task");
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
