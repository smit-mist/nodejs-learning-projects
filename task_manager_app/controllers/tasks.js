const Task = require('../models/tasks');
const asyncWrapper = require('../middleware/async');


const getAllTasks = asyncWrapper(async (req, res) => {
    const tasks = await Task.find({});
    console.log(tasks);
    return res.status(200).json({ tasks });
});

const getSingleTasks = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params;
    const task = await Task.findOne({ _id: taskId });
    if (!task) {

        return res.status(404).json({ "msg": `No task with id:${id}` });
    }
    return res.status(200).json({ task });

});

const createTask = asyncWrapper(async (req, res) => {
    const task = await Task.create(req.body);
    return res.status(201).json({ task });

});

const deleteTask = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndDelete({ _id: taskId });
    if (!task) {
        return res.status(404).json({ "msg": `No task with id:${id}` });
    }
    return res.status(200).json({ task });

});

const updateTasks = asyncWrapper(async (req, res) => {
    const { id: taskId } = req.params;
    const task = await Task.findOneAndUpdate({ _id: taskId }, req.body, {
        new: true,
        runValidators: true,
    });
    if (!task) {
        return res.status(404).json({ "msg": `No task with id:${id}` });
    }
    return res.status(200).json({ task });

});

module.exports = {
    getAllTasks,
    getSingleTasks,
    createTask,
    deleteTask,
    updateTasks
};