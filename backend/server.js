const express=require("express")
const mongoose=require('mongoose')
const cors=require('cors')
const dotenv=require('dotenv').config()
const app=express()
app.use(express.json())
app.use(cors())

mongoose.connect(process.env.DB_URI)
    .then(()=>console.log("MongoDB connected"))
    .catch((err)=>console.log("Error connecting"))

const PORT=process.env.DB_URI
app.listen(PORT,()=>{
    console.log(`Server running on port ${PORT}`)
})



