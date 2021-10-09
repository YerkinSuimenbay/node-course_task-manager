const { Router } = require('express')
const User = require('../models/user')
const router = Router()
const auth = require('../middleware/auth')

// CREATE A NEW USER
router.post('/users', async (req, res) => {
    const user = new User(req.body)

    try {
        await user.save()
        const token = await user.generateAuthToken()
    
        res.status(201).send({ user, token })
    } catch (error) {
        res.status(400).send(error.message)
    }
})
// READ ALL USERS
router.get('/users/me', auth, async (req, res) => {
    res.send(req.user)
})
// READ THE USER
router.get('/users/:id', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)
        if (!user) return res.status(404).send('User not found')

        res.send(user)
    } catch (error) {
        res.status(500).send(`Server error: ${error.message}`)
    }
})
// MODIFY THE USER
router.patch('/users/:id', async (req, res) => {
    const updates = Object.keys(req.body)
    const allowedUpdates = ['name', 'email', 'password', 'age']
    const isValidOperation = updates.every(update => allowedUpdates.includes(update)) 

    if (!isValidOperation) return res.status(404).send({ error: 'Invalid updates!' })

    const { id } = req.params
    try {
        // const user = await User.findByIdAndUpdate(id, req.body, { new: true, runValidators: true })  // IN THIS CASE THE PRE_SAVE MIDDLEWARE DOESN'T WORK
        const user = await User.findById(id)
        if (!user) return res.status(404).send('User not found')
        
        updates.forEach(update => user[update] = req.body[update])
        await user.save()

        res.send(user)
    } catch (error) {
        res.status(400).send(error.message)
    }
})
// DELETE THE USER
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
// USER LOGIN
router.post('/users/login', async (req, res) => {
    try {
        const user = await User.findByCredentials(req.body.email, req.body.password)
        const token = await user.generateAuthToken()
        console.log(token);
        res.send({ user, token })
    } catch (error) {
        res.status(400).send(error.message)
    }
})

module.exports = router