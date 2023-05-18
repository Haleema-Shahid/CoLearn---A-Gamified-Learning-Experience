const express = require('express')
const session = require('express-session')
const { ObjectId } = require('mongodb');
const router = express.Router()
const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://hatUser:Hat2023@cluster0.an4x4aw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(() => console.log("db connected"))

//signup
router.post('/user', async (request, response) => { // add async keyword to use await later
  const collection = client.db("colearnDb").collection("user");
  const data = await collection.findOne({ email: request.body.email, role: request.body.role }); // use await to wait for the database query to finish
  if (data == null) {
    const user = { firstname: request.body.firstname, lastname: request.body.lastname, email: request.body.email, password: request.body.password, role: request.body.role };
    const result = await collection.insertOne(user); // use await to wait for the database operation to finish
    const userId = user._id.toString(); // convert the ObjectId to a string
    response.redirect(`/user/${userId}`); // redirect to the new URL with the user ID in the parameter
    //response.send(result.ops[0]); // return the newly created user object in the response
  }
  else {
    console.log("data is not null");
    console.log(data);
    //response.status(400).send("User already exists"); // return an error response if the user already exists
  }
})

router.get('/hello', async (request, response) => {
  console.log('hello');
})
//login
router.post('/login', async (request, response) => {
  const collection = client.db("colearnDb").collection("user");
  const user = await collection.findOne({ email: request.body.email, password: request.body.password, role: request.body.role });

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

//get student classes for student dashboard
router.get('/s/:userId', async (request, response) => {
  //console.log(request.params.userId);
  const collection = client.db("colearnDb").collection("class");
  const classes = await collection.find({ "students.id": new ObjectId(request.params.userId) }).toArray(); // get all classes made by the teacher with the specified ID
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
router.post('/create-class', async (request, response) => {
  const users = client.db("colearnDb").collection("user");
  const classes = client.db("colearnDb").collection("class");

  //const user = await classes.findOne({ teacher: ObjectId(request.body.user_id) }); // get the user from the database using the user ID in the URL parameter
  console.log("in post request");
  //console.l
  if (request.body.classname) {
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
  else {
    console.log("error");
  }
});

//join class
router.get('/s/:userId/join-class/:classCode', async (request, response) => {
  try {
    console.log("inside join class api");
    const classCode = request.params.classCode;
    const userId = request.params.userId
    console.log("after params");
    const classes = client.db("colearnDb").collection("class");
    //const students = client.db("colearnDb").collection("user");
    // Check if the class code exists
    if (classes) {
      console.log("classes is not empty");
    }

    const classObj = await classes.findOne({ _id: new ObjectId(classCode) });
    if (!classObj) {
      console.log('Class not found');
      return response.status(404).json({ message: 'Class not found' });
    }

    // Check if the student ID already exists in the class
    console.log(userId);
    console.log(classObj);
    const studentIndex = classObj.students.findIndex(student => student.id === userId);
    if (studentIndex != -1) {
      console.log('Student already joined class');
      return response.status(400).json({ message: 'Student already joined class' });
    }

    // Add the student ID to the class
    classObj.students.push(userId);

    const studentObj = {
      id: new ObjectId(userId),
      position: -1,
      badge: ''
    }

    await classes.updateOne({ _id: classObj._id }, { $push: { students: studentObj } });

    console.log('Student success joined class')
    response.status(200).json({ message: 'Student joined class successfully' });
  } catch (error) {
    console.error(error);
    response.status(500).json({ message: 'Internal server error' });
  }
});

//get weeks of specific class for teacher
router.get('/t/:userId/class/:classId/weeks', async (req, res) => {
  try {
    const { userId, classId } = req.params;

    // Check if the userId and classId are valid ObjectId types
    if (!ObjectId.isValid(userId) || !ObjectId.isValid(classId)) {
      return res.status(400).json({ message: "Invalid user or class ID" });
    }

    // Get the 'weeks' collection from the database
    const weeks = client.db("colearnDb").collection("week");

    // Find all weeks of the class with the specified ID
    const weekData = await weeks.find({ classId: new ObjectId(classId) }).toArray();
    console.log("weekData");
    console.log(weekData);

    if (weekData.length > 0) {
      console.log("weekData is not empty");
      return res.json(weekData);
    } else {
      console.log("weekData is empty");
      return res.json();
    }
  } catch (err) {
    consol
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

//add week 
router.post('/t/:userId/class/:classId/week', async (request, response) => {
  //const classes = client.db("colearnDb").collection("class");
  console.log("in add wekk api");
  const weeks = client.db("colearnDb").collection("week");
  //const thisClass = classes.findOne({_id: ObjectId(request.params.classId)});
  const newWeek = {
    number: request.body.weekNumber,
    topics: [],
    classId: new ObjectId(request.params.classId)
  }
  weeks.insertOne(newWeek);
  console.log(newWeek);
  response.json(newWeek);

})

//get topics of specified week
router.get('/t/:userId/class/:classId/week/:weekId/topics', async (req, res) => {
  try {
    const { userId, classId, weekId } = req.params;

    // Check if the userId and classId are valid ObjectId types
    if (!ObjectId.isValid(userId) || !ObjectId.isValid(classId) || !ObjectId.isValid(weekId)) {
      return res.status(400).json({ message: "Invalid user or class ID" });
    }

    // Get the 'weeks' collection from the database
    const topics = client.db("colearnDb").collection("topic");

    // Find all weeks of the class with the specified ID
    const topicsData = await topics.find({ weekId: new ObjectId(weekId) }).toArray();
    console.log("topicsData");
    console.log(topicsData);

    if (topicsData.length > 0) {
      console.log("topicsData is not empty");
      return res.json(topicsData);
    } else {
      console.log("topicsData is empty");
      return res.json();
    }
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
});

//add topic
router.post('/t/:userId/class/:classId/week/:weekId/topic', async (req, res) => {
  try {
    const topicsCollection = client.db('colearnDb').collection('topic');

    const { userId, classId, weekId } = req.params;
    const { name } = req.body;

    // Add relevant checks here, e.g., check if user, class, and week exist

    const newTopic = {
      name: name,
      materials: [],
      assignments: [],
      weekId: new ObjectId(weekId)
    };

    console.log("inserting topicname: ", newTopic.name);
    topicsCollection.insertOne(newTopic);
  } catch (error) {
    console.error('Error adding topic:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


router.post('/t/:userId/class/:classId/week/:weekId/topic/:topicId/assignment', async (request, response) => {
  const { userId, classId, weekId, topicId } = request.params;
  const { newAssn, helpingMaterials } = request.body;
  console.log("in assignment api: ", newAssn);
  console.log("helping materials: ", helpingMaterials);

  try {
    const colearnDb = client.db("colearnDb");
    const assignmentsCollection = colearnDb.collection("assignment");
    const helpingMaterialCollection = colearnDb.collection("helpingmaterial");

    // Insert the assignment
    const assignmentResult = await assignmentsCollection.insertOne(newAssn);
    console.log("inserted: ", assignmentResult);

    const assignmentId = assignmentResult.insertedId;
    console.log("assignmentId: ", assignmentId);

    const helpingMaterialIds = [];

    // Insert the helping materials one by one
    for (const helpingMaterial of helpingMaterials) {
      helpingMaterial.asnId = assignmentId;
      const helpingMaterialResult = await helpingMaterialCollection.insertOne(helpingMaterial);
      helpingMaterialIds.push(helpingMaterialResult.insertedId);
    }

    response.status(200).json({
      assignmentId: assignmentId.toString(),
      helpingMaterialIds: helpingMaterialIds.map(id => id.toString())
    });
  } catch (error) {
    console.error("Error creating assignment:", error);
    response.status(500).json({ error: "Failed to create assignment" });
  }
});




module.exports = router