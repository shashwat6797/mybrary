if(process.env.NODE_ENV !== 'production'){
    require('dotenv').parse('.env')
}

const express = require("express");
const app = express();
const expressLayouts = require("express-ejs-layouts");

const indexRouter = require('./routes/index')

app.set("view engine", "ejs");
app.set("views", __dirname+"/views")
app.set('layout', 'layouts/layout')
app.use(expressLayouts)
app.use(express.static('public'))

// const { MongoClient } = require('mongodb');

// const uri = (process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017'); // Replace with your MongoDB connection string
// const client = new MongoClient(uri);
// async function connectToDatabase() {
//   try {
//     await client.connect();
//     console.log('Connected to MongoDB successfully!'); 
//   } catch (err) {
//     console.error('Error connecting to MongoDB:', err);
//   }
// }
//connectToDatabase();

const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL || 'mongodb://127.0.0.1:27017')
const db = mongoose.connection
db.on('error', error => console.error('error'))
db.once('open', ()=> console.log("Connected to Mongodb!"))





app.use('/', indexRouter)

app.listen(process.env.PORT || 3000)