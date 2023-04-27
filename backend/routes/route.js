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
    console.log("in reuest");
    console.log(request.params.userId);
    const collection = client.db("colearnDb").collection("class");
    const classes = await collection.find({ teacher: new ObjectId(request.params.userId) }).toArray(); // get all classes made by the teacher with the specified ID
    //const result = [];
    console.log(classes.length);
    if (classes.length > 0) {
      response.json(classes);
    } else {
      console.log("No classes found for this teacher.")
      //const only_class = await collection.findOne({ }).toArray(); // get all classes made by the teacher with the specified ID

      //response.status(404).send('Classes not found');
    }
});

//get student for student dashboard
router.get('/s/:userId', async (request, response) => {
    //console.log(request.params.userId);
    const collection = client.db("colearnDb").collection("class");
    const classes = await collection.find({ "students.id": new ObjectId(request.params.userId)}).toArray(); // get all classes made by the teacher with the specified ID
    //const classIds = classes.map((classObj) => classObj._id);
    //const result = [];
    //console.log(classIds);
    if (classes.length > 0) {
      response.json(classes);
    } else {
      console.log("No classes found for this teacher.")
      //const only_class = await collection.findOne({ }).toArray(); // get all classes made by the teacher with the specified ID

      //response.status(404).send('Classes not found');
    }
});

//class create
router.post('/create-class', async(request, response)=>{
    const users = client.db("colearnDb").collection("user");
    const classes = client.db("colearnDb").collection("class");
    
    //const user = await classes.findOne({ teacher: ObjectId(request.body.user_id) }); // get the user from the database using the user ID in the URL parameter
    console.log("in post request");
    //console.l
    if(request.body.classname){
        const newClass = {
            name: request.body.classname,
            description: request.body.description,
            teacher: new ObjectId(request.body.user_id),
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

//get weeks of specific class for teacher
router.get('/t/:userId/class/:classId/weeks', async(request, response)=>{
    const weeks = client.db("colearnDb").collection("week");
    //const thisClass = classes.findOne({_id: ObjectId(request.params.classId)});

    if(weeks){
        const data = await weeks.find({ classId: new ObjectId(request.params.classId) }).toArray(); // get all weeks of the class with the specified ID
        console.log(data);
        if(data.length>0){
            response.json(data);
        }
        else{
            console.log("no weeks returned");
        }        
        //response.redirect(`/user/:userId/class/${classId}`)
    }
    else{
        console.log("error in get class");
    }
});

//add week
router.post('/user/:userId/class/:classId/week', async(request, response)=>{
    //const classes = client.db("colearnDb").collection("class");
    const weeks = client.db("colearnDb").collection("week");
    //const thisClass = classes.findOne({_id: ObjectId(request.params.classId)});
    const newWeek = {
        number: request.body.weekNumber,
        topics: [],
        classId: new ObjectId(request.params.classId)
    }
    weeks.insertOne(newWeek);
})

router.post('/assignment', async(request, response)=>{
    const classes = client.db("colearnDb").collection("class");


})


module.exports = router