const Task = require("../modules/tasks");
const asyncWrapper = require("../middleware/async");

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json({ tasks });
  // res.send("all items from the file");
});

const getTaskById = async (req, res) => {
  // res.send('task by id')
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOne({
      _id: taskId,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId} ` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json(error);
  }
};

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const updateTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
      new: true,
      runValidators: true,
    });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId} ` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json(error);
  }
};

const deleteTask = async (req, res) => {
  try {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
      return res.status(404).json({ msg: `No task with id : ${taskId} ` });
    }
    res.status(200).json({ task });
  } catch (error) {
    res.status(500).json(error);
  }
};

module.exports = {
  getAllTasks,
  getTaskById,
  createTask,
  updateTask,
  deleteTask,
};
