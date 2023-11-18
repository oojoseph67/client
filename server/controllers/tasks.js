const getAllTasks = (req, res) => {
  res.send("all items from the file");
};

const getTaskById = (req, res) => {
  // res.send('task by id')
  let taskId = req.params.id;
  res.json(taskId);
};

const createTask = (req, res) => {
  // res.send('create task')
  res.json(req.body);
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
