require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const workoutRoutes = require('./routes/workouts')

const app = express()

app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method);
    next()
})

//route
app.use('/api/workouts', workoutRoutes)

//connect db
mongoose.set("strictQuery", false);
mongoose.connect(process.env.MONG_URI)
    .then(() => {
        // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('listening on port', process.env.PORT)
        })
    })
    .catch(e => {
        console.log(e);
    })

