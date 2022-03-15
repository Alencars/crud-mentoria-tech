const express = require('express')
const mongoose = require('mongoose')

require("dotenv").config()
const app = express()

app.use(
    express.urlencoded({
        extended: true,
    }),
)

app.use(express.json())

const clientRoutes = require('./routes/routesClient')

app.use('/client', clientRoutes)

app.get("/", (req, res) => {

    res.json({ message: 'Oi express!'})

})


const DB_USER = process.env.DB_USER
const DB_PASSWORD = process.env.DB_PASSWORD

mongoose
.connect(
    `mongodb+srv://${DB_USER}:${DB_PASSWORD}@apicluster.yu4ju.mongodb.net/bancodaapi?retryWrites=true&w=majority`
)
.then(() =>{
    console.log('Conectamos ao MongoDB!')
    app.listen(3000)
})
.catch((err) => console.log(err))

//app.listen(3000)

