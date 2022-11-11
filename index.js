const express = require('express')
const  morgan = require('morgan')
const mongoose = require('mongoose') 
const appRoutes = require('./routes/todoRoutes.js')

const port = process.env.PORT || 9000

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use('/todoapp', appRoutes)

// handle errors
// if the request has been made to an invalid route
app.use((req, res, next) => {
    const error = new Error('Not found')
    res.status = 404
    next(error)
})

// for all other errors including our custom made error
// forwarded from above
app.use((error, req, res, next) => {
    res.status = error.status || 500
    res.json({
        error: error.message
    })
})

async function main() {
    // await mongoose.connect("mongodb+srv://sir_sanctified:s4nct1f13d@cluster0.dkrsxw2.mongodb.net/?retryWrites=true&w=majority")
    await mongoose.connect('mongodb+srv://Stealth:Stealth01@stealth.r6hvkad.mongodb.net/stealth').then(console.log("connected"))
    app.listen(port, () => {
        console.log(`Server is running on port ${port}`)
    })
}

main()