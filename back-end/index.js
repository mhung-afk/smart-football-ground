import express from "express"
import dotenv from "dotenv"
import mongoose from "mongoose"
import cors from "cors"

import authRoute from "./router/auth.js"
import productRoute from "./router/product.js"
import ticketRoute from "./router/ticket.js"
import userInfoRoute from "./router/userInfo.js"
import adafruitRoute from "./router/adafruit.js"
import matchInfoRoute from "./router/matchInfo.js"
dotenv.config()

/**
 * Connect MongoDB
 */
mongoose.connect(process.env.MONGO_URI, () => {
    console.log('Connect MongoDB successfully.')
}).catch(error => console.log(error.reason))

const PORT = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(express.static('public'))
app.use(cors())

app.use('/api/auth', authRoute)
app.use('/api/products', productRoute)
app.use('/api/tickets', ticketRoute)
app.use('/api/user-info', userInfoRoute)
app.use('/api/adafruit', adafruitRoute)
app.use('/api/match-info', matchInfoRoute)
app.get('/healthz', (req, res) => res.send("OK"))

app.listen(PORT, () => {
    console.log(`Server start at port: ${PORT}`)
})