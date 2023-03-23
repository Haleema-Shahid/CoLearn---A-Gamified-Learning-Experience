const express = require('express')
const session = require('express-session')

const router = express.Router()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hatUser:Hat2023@cluster0.an4x4aw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(()=>console.log("db connected"))
// client.connect(err => {
//   if (err) throw err;
//   const collection = client.db("colearnDb").collection("user");
//   client.close();
// });

//const userTemplateCopy = require('../models/usermodel')

router.post('/signup', async (request, response)=> { // add async keyword to use await later
    const collection = client.db("colearnDb").collection("user");
    const data = await collection.findOne({email: request.body.email, role: request.body.role}); // use await to wait for the database query to finish
    if(data == null){
        const user = {firstname: request.body.firstname , lastname: request.body.lastname , email: request.body.email , password: request.body.password , role: request.body.role};
        const result = await collection.insertOne(user); // use await to wait for the database operation to finish
        //response.send(result.ops[0]); // return the newly created user object in the response
    }
    else{
        console.log("data is not null");
        console.log(data);
        //response.status(400).send("User already exists"); // return an error response if the user already exists
    }
})

// router.get('/user', async (request, response) => {
//     const collection = client.db("colearnDb").collection("user");
//     const user = await collection.findOne({ email: request.body.email, password: request.body.password, role: request.body.role});

//     if (user) {
//         request.session.userId = user._id;
//         //console.log(request.session.userId);
//         console.log(user);
//         //response.send(user);
//     } else {
//         console.log("error")
//         //response.status(401).send('Invalid email or password');
//     }
// });
router.get('/user/:userId', async (request, response) => {
    const collection = client.db("colearnDb").collection("user");
    const user = await collection.findOne({ email: request.body.email, password: request.body.password, role: request.body.role});

    if (user) {
        const userId = user._id.toString(); // convert the ObjectId to a string
        response.redirect(`/user/${userId}`); // redirect to the new URL with the user ID in the parameter
    } else {
        console.log("error")
        //response.status(401).send('Invalid email or password');
    }
});

router.get('/user/:userId', async (request, response) => {
    const collection = client.db("colearnDb").collection("user");
    const user = await collection.findOne({ _id: ObjectId(request.params.userId) }); // get the user from the database using the user ID in the URL parameter

    if (user) {
        request.session.userId = user._id;
        console.log(user);
        //response.send(user);
    } else {
        console.log("error")
        //response.status(404).send('User not found');
    }
});
router.post('/class', async(request, response)=>{
    const users = client.db("colearnDb").collection("user");
    const classes = client.db("colearnDb").collection("class");
    //console.l
    if(request.body.name){
        const newClass = {
            name: request.body.name,
            description: request.body.description,
            teacher: request.session.userId,
            students: [],
            weeks: []
        }
        classes.insertOne(newClass);
        request.session.classId = classes.findOne(newClass)._id;
        //console.log("inserted");
        console.log(classes.findOne(newClass));
    }
    else{
        console.log("error");
    }

    



})

router.post('/week', async(request, response)=>{
    const classes = client.db("colearnDb").collection("class");
    

})

router.post('/assignment', async(request, response)=>{
    const classes = client.db("colearnDb").collection("class");


})


module.exports = router