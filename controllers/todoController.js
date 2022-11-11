const Todo = require('../models/Todo.js')
const mongoose = require('mongoose')
const MongoClient = require('mongodb').MongoClient

// const client = new MongoClient()

exports.getTodos =  async(req, res, next) => {
    const all = await Todo.find()
    res.satus(200).json(all)
    console.log(all)
}

exports.createTodo = async(req, res, next) =>  {
    console.log("called the post")
    try {
        const todo = new Todo({
            _id: mongoose.Types.ObjectId(),
            title: req.body.title,
            description: req.body.description,
            timestamp: Date()
        })
        await todo.save()
        console.log(todo)
        res.json(todo)

    } catch (error) {
        res.status(200).json({
            error: error.message
        })
    }
}

exports.getTodoById =  async(req, res, next)  => {
    const todo = await Todo.findById(req.params.todoId)
    res.json(todo)
}

exports.updateTodo =  async(req, res, next) =>  {
    const id = req.params.todoId
    const updated = req.body
    const options = {
        new: true
    }
    const todo = await Todo.findByIdAndUpdate(id, updated, options)
    res.send({
        "message": "Task has been updated successifully"
    })
}

exports.deleteTodo =  async(req, res, next) => {
    try {
        const id = req.params.todoId
        const data = await Todo.findByIdAndDelete(id)
        res.send(`Task with title '${data.title}' has been deleted`)
        console.log('Task successifully deleted')
    } catch (error) {
        res.status(400).json({
            error: error.message
        })
    }
}