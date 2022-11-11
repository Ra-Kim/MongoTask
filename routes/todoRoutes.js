const express = require('express')
const  {
    getTodos,
    getTodoById,
    updateTodo,
    deleteTodo,
    createTodo
} =  require('../controllers/todoController.js')

const appRoutes = express.Router()

appRoutes.get('/', getTodos)
appRoutes.post('/', createTodo)
appRoutes.get('/:todoId', getTodoById)
appRoutes.patch('/:todoId', updateTodo)
appRoutes.delete('/:todoId', deleteTodo)

module.exports = appRoutes