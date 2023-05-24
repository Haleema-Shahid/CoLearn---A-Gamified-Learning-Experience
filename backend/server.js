const express = require('express')
const app = express()
//const mongoose = require('mongoose')
const routesUrls = require('./routes/route')
const dotenv = require('dotenv')
const cors = require('cors')
const session = require('express-session');
// var admin = require("firebase-admin");
// var serviceAccount = require("C:\Users\Haleema Shahid\Desktop\CoLearn\firebase-admin-sdk\colearn-35de8-firebase-adminsdk-rblxy-3794af0748.json");

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });


app.use(session({
  secret: 'haleema1073',
  resave: false,
  saveUninitialized: false
}));

//const { MongoClient, ServerApiVersion } = require('mongodb');

//dotenv.config()


// const uri = "mongodb+srv://hatUser:Hat2023@cluster0.an4x4aw.mongodb.net/?retryWrites=true&w=majority";
// const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// //client.connect(()=>console.log("db connected"))
// client.connect(err => {
//   if (err) throw err;
//   const collection = client.db("colearnDb").collection("user");
//   client.close();
// });

app.use(express.json())
app.use(cors())
app.use('/backend', routesUrls)


app.listen(4000, () => console.log("Server is up and running\n"))