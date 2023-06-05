const express = require('express');
const app = express();
const mongoose = require('mongoose');
const routesUrls = require('./routes/route');
const dotenv = require('dotenv');
const cors = require('cors');
const session = require('express-session');

dotenv.config();

app.use(session({
  secret: 'haleema1073',
  resave: false,
  saveUninitialized: false
}));

app.use(express.json());
app.use(cors());
app.use('/backend', routesUrls);

const MONGODB_URI = "mongodb://hatUser:Hat2023@ac-qxjfc1x-shard-00-00.an4x4aw.mongodb.net:27017,ac-qxjfc1x-shard-00-01.an4x4aw.mongodb.net:27017,ac-qxjfc1x-shard-00-02.an4x4aw.mongodb.net:27017/?ssl=true&replicaSet=atlas-dkezdr-shard-0&authSource=admin&retryWrites=true&w=majority";

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(4000, () => console.log("Server is up and running"));
  })
  .catch((error) => {
    console.error('Error connecting to MongoDB:', error);
  });







//....................................................................................................



// const express = require('express')
// const app = express()
// //const mongoose = require('mongoose')
// const routesUrls = require('./routes/route')
// const dotenv = require('dotenv')
// const cors = require('cors')
// const session = require('express-session');



// app.use(session({
//   secret: 'haleema1073',
//   resave: false,
//   saveUninitialized: false
// }));

// //const { MongoClient, ServerApiVersion } = require('mongodb');

// //dotenv.config()


// // const uri = "mongodb+srv://hatUser:Hat2023@cluster0.an4x4aw.mongodb.net/?retryWrites=true&w=majority";
// // const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
// // //client.connect(()=>console.log("db connected"))
// // client.connect(err => {
// //   if (err) throw err;
// //   const collection = client.db("colearnDb").collection("user");
// //   client.close();
// // });

// app.use(express.json())
// app.use(cors())
// app.use('/backend', routesUrls)


// app.listen(4000, () => console.log("Server is up and running\n"))