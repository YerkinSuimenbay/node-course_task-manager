const { Router } = require('express')
const User = require('../models/user')
const router = Router()


router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        res.status(201).send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.get('/users', async (req, res) => {
    try {
        const users = await User.find({})
        res.send(users)
    } catch (error) {
        res.status(500).send(`Server error: ${error.message}`)
    }
})

router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).send('User not found')

        res.send(user)
    } catch (error) {
        res.status(500).send(`Server error: ${error.message}`)
    }
})

router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update)) 

    if (!isValidOperation) return res.status(404).send({ error: 'Invalid updates!' })

    const { id } = req.params
    try {
        const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })
        if (!user) return res.status(404).send('User not found')

        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})

router.delete('/users/:id', async (req, res) => {
    const { id } = req.params

    try {
        const user = await User.findByIdAndDelete(id)
        if (!user) return res.status(404).send('User not found')

        res.send(user)
    } catch (error) {
        res.status(500).send(error.message)
    }
})

module.exports = router