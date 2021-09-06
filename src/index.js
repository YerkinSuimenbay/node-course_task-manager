const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')

const app = express()

app.use(express.json())

const PORT = process.env.PORT || 4000

app.post('/users', (req, res) => {
    const user = new User(req.body)
    user.save()
        .then(() => res.status(201).send(user))
        .catch(err => res.status(400).send(err.message))
})

app.get('/users', (req, res) => {
    User.find({})
        .then(users => res.send(users))
        .catch(err => res.status(500).send(`Server error: ${err.message}`))
})

app.get('/users/:id', (req, res) => {
    User.findById(req.params.id)
        .then(user => {
            if (!user) return res.status(404).send('User not found')

            res.send(user)
        })
        .catch(err => res.status(500).send(`Server error: ${err.message}`))
})

app.post('/tasks', (req, res) => {
    const task = new Task(req.body)

    task.save()
        .then(() => res.status(201).send(task))
        .catch(err => res.status(400).send(err.message))
})

app.get('/tasks', (req, res) => {
    Task.find({})
        .then(tasks => res.send(tasks))
        .catch(err => res.status(500).send(`Server error: ${err.message}`))
})

app.get('/tasks/:id', (req, res) => {
    const { id } = req.params
    Task.findById(id)
        .then(task => {
            if (!task) return res.status(404).send('Task not found')
            res.send(task)
        })
        .catch(err => res.status(500).send(`Server error: ${err.message}`))
})

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))