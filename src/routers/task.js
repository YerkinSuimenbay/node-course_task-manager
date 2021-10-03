const { Router } = require('express')
const Task = require('../models/task')
const router = Router()

router.post('/tasks', async (req, res) => {
    const task = new Task(req.body)

    try {
        await task.save()
        res.status(201).send(task)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find({})
        res.send(tasks)
    } catch (error) {
        res.status(500).send(`Server error: ${error.message}`)
    }
})

router.get('/tasks/:id', async (req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findById(id)
        if (!task) return res.status(404).send('Task not found')

        res.send(task)
    } catch (error) {
        res.status(500).send(`Server error: ${error.message}`)
    }
})

router.patch('/tasks/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['description', 'completed']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update))
    if (!isValidOperation) return res.status(400).send({ error: 'Invalid updates!' })

    const { id } = req.params

    try {
        const task = await Task.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
         
        if (!task) return res.status(404).send('Task not found')
        res.send(task)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/tasks/:id', async(req, res) => {
    const { id } = req.params
    try {
        const task = await Task.findByIdAndDelete(id)
        if (!task) return res.status(404).send('Task not found')
        res.send(task)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router