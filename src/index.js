const express = require('express')
require('./db/mongoose')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')


const app = express()

app.use(express.json())

const PORT = process.env.PORT || 4040

app.use(userRouter)
app.use(taskRouter)

app.listen(PORT, () => console.log(`Server is listening on port ${PORT}...`))