// server.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const app = express();
const cookieParser=require('cookie-parser');
const connectToMongoDB = require('./config/db');
const PORT=process.env.PORT;

//middleware
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/auth', require('./routes/auth'));
app.use('/api/blogs', require('./routes/blogs'));

app.listen(process.env.PORT, () => {
    console.log(`Server running on ${PORT}`);
    connectToMongoDB();
});
