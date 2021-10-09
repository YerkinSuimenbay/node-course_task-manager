const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')

const PORT = process.env.PORT || 4040
const app = express()

app.use(express.json())

// app.use((req, res, next) => {  // ORDER OF APP.USE() IS IMPORTANT
//     res.status(503).send({ message: 'Task.js Maintenance'})
// })


app.use(userRouter)
app.use(taskRouter)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))