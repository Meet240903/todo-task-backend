require('dotenv').config();
const connectToMongo=require('./db');
const express = require('express');
connectToMongo();
const app = express();
const mongoose = require('mongoose');
const users = require('./models/userSchema')
const cors = require('cors')
const router = require('./routes/router')

const port = 5000;

app.use(cors());
app.use(express.json());
app.use(router);
app.listen(port,()=>{
    console.log(`Server is start port number is ${port}`)
})