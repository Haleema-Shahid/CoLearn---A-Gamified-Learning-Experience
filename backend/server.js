const express = require('express')
const app = express()
const mongoose = require('mongoose')
const routesUrls = require('./routes/route')
const dotenv = require('dotenv')
const cors = require('cors')


const { MongoClient, ServerApiVersion } = require('mongodb');

dotenv.config() 


const uri = "mongodb+srv://hatUser:Hat2023@cluster0.an4x4aw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
//client.connect(()=>console.log("db connected"))
client.connect(err => {
  if (err) throw err;
  const collection = client.db("colearnDb").collection("user");
  client.close();
});

app.use(express.json())
app.use(cors())
app.use('/api',routesUrls) 

app.listen(4000, ()=> console.log("Server is up and running\n"))