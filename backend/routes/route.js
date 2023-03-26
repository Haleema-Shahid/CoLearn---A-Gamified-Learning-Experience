const express = require('express')
const session = require('express-session')
const { ObjectId} = require('mongodb');
const router = express.Router()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hatUser:Hat2023@cluster0.an4x4aw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(()=>console.log("db connected"))

//signup
router.post('/user', async (request, response)=> { // add async keyword to use await later
    const collection = client.db("colearnDb").collection("user");
    const data = await collection.findOne({email: request.body.email, role: request.body.role}); // use await to wait for the database query to finish
    if(data == null){
        const user = {firstname: request.body.firstname , lastname: request.body.lastname , email: request.body.email , password: request.body.password , role: request.body.role};
        const result = await collection.insertOne(user); // use await to wait for the database operation to finish
        const userId = user._id.toString(); // convert the ObjectId to a string
        response.redirect(`/user/${userId}`); // redirect to the new URL with the user ID in the parameter
        //response.send(result.ops[0]); // return the newly created user object in the response
    }
    else{
        console.log("data is not null");
        console.log(data);
        //response.status(400).send("User already exists"); // return an error response if the user already exists
    }
})

router.get('/hello' ,async (request, response) => {
    console.log('hello');
  })
//login
router.post('/login', async (request, response) => {
    const collection = client.db("colearnDb").collection("user");
    const user = await collection.findOne({ email: request.body.email, password: request.body.password, role: request.body.role});

    if (user) {
        const userId = user._id.toString(); // convert the ObjectId to a string
        //response.json(user);
        response.json(user);
        console.log(user);
        //response.redirect(`/user/${userId}`); // redirect to the new URL with the user ID in the parameter
    } else {
        console.log("error")
        response.status(401).send('Invalid email or password');
    }
    //console.log("zawyar")
});

//get teacher for teacher dashboard
router.get('/t/:userId', async (request, response) => {
    const collection = client.db("colearnDb").collection("class");
    const classes = await collection.find({ teacherId: ObjectId(request.params.teacherId) }).toArray(); // get all classes made by the teacher with the specified ID
  
    if (classes.length > 0) {
      response.send(classes);
    } else {
      //console.log("No classes found for this teacher.")
      response.status(404).send('Classes not found');
    }
});

//class create
router.post('/t/:userId/class', async(request, response)=>{
    const users = client.db("colearnDb").collection("user");
    const classes = client.db("colearnDb").collection("class");
    
    //const user = await classes.findOne({ teacher: ObjectId(request.body.user_id) }); // get the user from the database using the user ID in the URL parameter

    //console.l
    if(request.body.classname){
        const newClass = {
            name: request.body.classname,
            description: request.body.description,
            teacher: ObjectId(request.body.user_id),
            students: [],
            weeks: []
        }
        classes.insertOne(newClass);
        const thisClass = classes.findOne(newClass); 
        //const classId = classes.findOne(newClass)._id.toString();
        //response.redirect(`/user/:userId/class/${classId}`);
        console.log("inserted");
        console.log(thisClass);
        response.json(thisClass);
        //console.log(classes.findOne(newClass));
    }
    else{
        console.log("error");
    }

    



});

//class get
router.get('/user/:userId/class/:classId', async(request, response)=>{
    const classes = client.db("colearnDb").collection("class");
    const userClass = classes.findOne({_id: ObjectId(request.params.classId)});

    if(userClass){
        const classId = userClass._id.toString();
        response.send(userClass)
        //response.redirect(`/user/:userId/class/${classId}`)
    }
    else{
        console.log("error in get class");
    }
});
router.post('/week', async(request, response)=>{
    const classes = client.db("colearnDb").collection("class");
    

})

router.post('/assignment', async(request, response)=>{
    const classes = client.db("colearnDb").collection("class");


})


module.exports = router