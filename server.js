require('dotenv').config();

const { PORT = 3001, DATABASE_URL } = process.env

const express = require('express')

const app = express()

const mongoose = require('mongoose')

const cors = require('cors')
const morgan = require('morgan')

mongoose.connect(DATABASE_URL)

const PhotosSchema = new mongoose.Schema({
  title: String,
  url: String,
  description: String,
})

const Photos = mongoose.model("Photos", PhotosSchema)

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.get("/", (req, res) => {
  res.send('i work!')
})

app.get("/photos", async (req, res) => {
  try {
    res.json(await Photos.find({}))
  } catch (error) {
    res.status(400).json(error)
  }
})

app.post("/photos", async (req, res) => {
  try {
    res.jason(await Photos.create(req.body))
  } catch(error) {
    res.status(400).json(error)
  }
})

app.delete("/photos/:id", async (req, res) => {
  try {
    res.json(await Photos.findByIdAndDelete(req.params.id))
  } catch(error) {
    res.status(400).json(error)
  }
})

app.put("/photos/:id", async (req, res) => {
  try {
    res.json(await Photos.findByIdAndUpdate(req.params.id, req.body, { new : true }))
  } catch(error) {
    res.status(400).json(error)
  }
})

app.listen(PORT, () => console.log(`${PORT}`))