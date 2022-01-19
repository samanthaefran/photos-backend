require('dotenv').config();

const { PORT = 3001, DATABASE } = process.env

const express = require('express')

const app = express()

const mongoose = require('mongoose')

const cors = require('cors')
const morgan = require('morgan')

const PhotosSchema = new mongoose.Schema ({
  title: String,
  url: String,
  description: String,
})

const Photos = mongoose.model("Photos", PhotosSchema)

app.use(cors())
app.use(morgan("dev"))
app.use(express.json())

app.get('/', (req, res) => {
  res.send('i work!')
})

app.listen(PORT, () => console.log(`${PORT}`))