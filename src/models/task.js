const { model, Schema } = require('mongoose')

const taskSchema = new Schema({
    description: {
        type: String,
        required: true,
        trim: true,

    }, 
    completed: {
        type: Boolean,
        default: false
    }
})

// taskSchema.pre('save', async function(next) {
//     const task = this
//     if (task.isModified('someProperty')) {
//         // do smth
//     }

//     next()
// })

const Task = model('Task', taskSchema)

module.exports = Task