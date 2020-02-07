const express = require('express');
const app = express();
const morgan = require('morgan')

//import mongoose
const mongoose = require('mongoose');
//load env variables
const dotenv = require('dotenv');
dotenv.config();

//db connection
mongoose.connect(
  process.env.MONGO_URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true
  }
)
  .then(() => console.log('DB connected'))

mongoose.connection.on('error', err => {
  console.log(`DB connection error: ${err.message}`)
})

//get routes
const postRoutes = require('./routes/post')


//use middleware
app.use(morgan("dev"));

app.use("/", postRoutes)

const port = 8080
app.listen(port, () => {
  console.log(`A Node Js API is listening on port: ${port}`)
});