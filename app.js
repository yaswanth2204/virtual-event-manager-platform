require("dotenv").config()
const express = require("express")
const mongoose = require("mongoose")
const PORT = process.env.PORT
const MONGODB_URI = process.env.MONGODB_URI
const app = express()
const userRoutes = require("./routes/userRoutes")
const eventRoutes = require("./routes/eventRoutes")

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/users", userRoutes)
app.use("/events", eventRoutes)



mongoose.connect(MONGODB_URI).then(() => {
    console.log("DB Connected")
    app.listen(PORT, () => {
        console.log(`server is running on port ${PORT}`)
    })
})
