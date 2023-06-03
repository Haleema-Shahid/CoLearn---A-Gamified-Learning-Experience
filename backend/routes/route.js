const express = require('express')
const session = require('express-session')
const { ObjectId } = require('mongodb');
const router = express.Router()
const { MongoClient, ServerApiVersion } = require('mongodb');
const { spawn } = require('child_process');
const path = require('path');
const { RepeatOneSharp } = require('@mui/icons-material');


const uri = "mongodb+srv://hatUser:Hat2023@cluster0.an4x4aw.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
client.connect(() => console.log("db connected"))

//signup
router.post('/user', async (request, response) => { // add async keyword to use await later
  const collection = client.db("colearnDb").collection("user");
  const data = await collection.findOne({ email: request.body.email, role: request.body.role }); // use await to wait for the database query to finish
  if (data == null) {
    const user = { firstname: request.body.firstName, lastname: request.body.lastName, email: request.body.email, password: request.body.password, role: request.body.role };
    const result = await collection.insertOne(user); // use await to wait for the database operation to finish
    const userId = user._id.toString(); // convert the ObjectId to a string
    console.log("role: ", user.role);
    response.json(user);
    // if (user.role == 'student') {
    //   response.redirect(`/s/${userId}`); // redirect to the new URL with the user ID in the parameter

    // }
    // else if (user.role == 'teacher') {
    //   response.redirect(`/t/${userId}`); // redirect to the new URL with the user ID in the parameter

    // }
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
    response.json({ error: 'Invalid email or password' });
  }
  //console.log("zawyar")
});

//get user for header
router.get('/user/:userId', async (request, response) => {
  try {
    console.log("in get user for header api");
    console.log(request.params.userId);
    const user = await client.db("colearnDb").collection("user").findOne({ _id: new ObjectId(request.params.userId) });

    if (user) {
      response.json(user);
    } else {
      console.log("No user found.");
      response.status(404).send('User not found');
    }
  } catch (error) {
    console.log("Error retrieving user:", error);
    response.status(500).send('An error occurred while retrieving user');
  }
});



//get teacher for teacher dashboard
router.get('/t/:userId', async (request, response) => {
  console.log("in get classes -t api");
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
    console.log("No classes found for this student")
    response.json(classes);
    //const only_class = await collection.findOne({ }).toArray(); // get all classes made by the teacher with the specified ID

    //response.status(404).send('Classes not found');
  }
});

//create class
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

//delete class
router.post('/delete-class/:thisClassId', async (request, response) => {
  const classId = new ObjectId(request.params.thisClassId);
  console.log("classId: ", classId);

  try {
    const classesCollection = client.db("colearnDb").collection("class");

    const weeksCollection = client.db("colearnDb").collection("week");
    const topicsCollection = client.db("colearnDb").collection("topic");
    const assignmentsCollection = client.db("colearnDb").collection("assignment");
    const materialsCollection = client.db("colearnDb").collection("material");
    const submissionsCollection = client.db("colearnDb").collection("submission");

    // Check if the class exists
    const existingClass = await classesCollection.findOne({ _id: classId });
    if (!existingClass) {
      return response.status(404).json({ error: 'Class not found' });
    }

    // Perform cascading deletions
    const weeksToBeDeleted = await weeksCollection.find({ classId: classId }).toArray();
    //const weekIdsToDelete = weeksToBeDeleted.map((week) => week._id).toArray();
    const weekIdsToDelete = [];
    for (let i = 0; i < weeksToBeDeleted.length; i++) {
      weekIdsToDelete.push(weeksToBeDeleted[i]._id);
    }
    console.log("weeks to be deleted: ", weekIdsToDelete);

    const topicsToBeDeleted = await topicsCollection.find({ weekId: { $in: weekIdsToDelete } }).toArray();
    const topicIdsToDelete = [];//topicsToBeDeleted.map((topic) => topic._id).toArray();
    for (let i = 0; i < topicsToBeDeleted.length; i++) {
      topicIdsToDelete.push(topicsToBeDeleted[i]._id);
    }
    console.log("topics to be deleted: ", topicIdsToDelete);

    const assignmentsToBeDeleted = await assignmentsCollection.find({ topicId: { $in: topicIdsToDelete } }).toArray();
    const assignmentIdsToDelete = [];//assignmentsToBeDeleted.map((assn) => assn._id).toArray();
    for (let i = 0; i < assignmentsToBeDeleted.length; i++) {
      assignmentIdsToDelete.push(assignmentsToBeDeleted[i]._id);
    }
    console.log("asses to be deleted: ", assignmentIdsToDelete);


    await submissionsCollection.deleteMany({ assignmentId: { $in: assignmentIdsToDelete } });
    await assignmentsCollection.deleteMany({ _id: { $in: assignmentIdsToDelete } });
    await materialsCollection.deleteMany({ topicId: { $in: topicIdsToDelete } });
    await topicsCollection.deleteMany({ _id: { $in: topicIdsToDelete } });
    await weeksCollection.deleteMany({ _id: { $in: weekIdsToDelete } });
    await classesCollection.deleteOne({ _id: classId });


    return response.status(200).json({ message: 'Class and associated data deleted successfully' });
  } catch (error) {
    console.error('Error deleting class and associated data:', error);
    return response.status(500).json({ error: 'An error occurred while deleting the class and associated data' });
  }
});




//join class
router.get('/s/:userId/join-class/:classCode', async (request, response) => {
  try {
    console.log("inside join class api");
    const classCode = request.params.classCode;
    const userId = request.params.userId
    console.log("class code: ", classCode);
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


//get class info
router.get('/class/:classId', async (req, res) => {
  try {
    const classId = new ObjectId(req.params.classId);
    // Assuming you have access to the class collection
    const classObject = await client.db("colearnDb").collection("class").findOne({ _id: classId });

    if (classObject) {
      res.status(200).json(classObject);
    } else {
      res.status(404).json({ message: 'Class not found' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Internal server error' });
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

//get weeks of specific class for student
router.get('/s/:userId/class/:classId/weeks', async (req, res) => {
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

//view topic materials and assignments -student
router.get('/s/:userId/class/:classId/week/:weekId/topic/:topicId', async (req, res) => {
  console.log("in view topic -s api");
  try {
    const { topicId } = req.params;

    // Fetch the topic
    const topicObject = await client.db("colearnDb").collection("topic").find({ _id: new ObjectId(topicId) });

    // Fetch assignments for the topic
    const assignments = await client.db("colearnDb").collection("assignment").find({ topicId: new ObjectId(topicId) }).toArray();

    // Fetch materials for the topic
    const materials = await client.db("colearnDb").collection("material").find({ topicId: new ObjectId(topicId) }).toArray();

    // Create the response object
    const responseObject = {
      topicObject,
      assignments,
      materials,
    };

    res.json(responseObject);
  } catch (error) {
    console.error('Error fetching topic:', error);
    res.status(500).json({ error: 'An error occurred while fetching the topic.' });
  }
});

//view topic materials and assignments -teacher
router.get('/t/:userId/class/:classId/week/:weekId/topic/:topicId', async (req, res) => {
  console.log("in view topic api");
  //console.log("topicId: ", topicId);
  try {
    const { topicId } = req.params;

    // Fetch the topic
    const topicObject = await client.db("colearnDb").collection("topic").findOne({ _id: new ObjectId(topicId) });

    // Fetch assignments for the topic
    const assignments = await client.db("colearnDb").collection("assignment").find({ topicId: new ObjectId(topicId) }).toArray();

    // Fetch materials for the topic
    const materials = await client.db("colearnDb").collection("material").find({ topicId: new ObjectId(topicId) }).toArray();

    console.log("topic: ", topicObject);
    console.log("assignments: ", assignments);
    console.log("assignments: ", materials);

    // Create the response object
    const responseObject = {
      topicObject,
      assignments,
      materials,
    };

    res.json(responseObject);
  } catch (error) {
    console.error('Error fetching topic:', error);
    res.status(500).json({ error: 'An error occurred while fetching the topic.' });
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

//upload assignment -teacher
router.post('/t/:userId/class/:classId/week/:weekId/topic/:topicId/assignment', async (request, response) => {
  const { userId, classId, weekId, topicId } = request.params;
  const { newAssn, helpingMaterials } = request.body;
  console.log("in assignment api: ", newAssn);
  console.log("newASSN topic ID: ", topicId)
  newAssn.topicId = new ObjectId(topicId);
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

//delete assignment -teacher
router.post('/delete-assignment/:assignmentId', async (request, response) => {
  const assignmentId = new ObjectId(request.params.assignmentId);
  console.log("assignmentId: ", assignmentId);

  try {
    const assignmentsCollection = client.db("colearnDb").collection("assignment");
    const submissionsCollection = client.db("colearnDb").collection("submission");
    //const helpingMaterialCollection = client.db("colearnDb").collection('helpingmaterial');
    // Check if the assignment exists
    const existingAssignment = await assignmentsCollection.findOne({ _id: assignmentId });
    if (!existingAssignment) {
      return response.status(404).json({ error: 'Assignment not found' });
    }

    // Delete the assignment and associated submissions
    await submissionsCollection.deleteMany({ assignmentId: assignmentId });
    //await helpingMaterialCollection.deleteMany({ asnId: assignmentId });
    await assignmentsCollection.deleteOne({ _id: assignmentId });

    return response.status(200).json({ message: 'Assignment and associated data deleted successfully' });
  } catch (error) {
    console.error('Error deleting assignment and associated data:', error);
    return response.status(500).json({ error: 'An error occurred while deleting the assignment and associated data' });
  }
});

//get assignment -student
router.get('/s/:userId/topic/:topicId/assignment/:assignmentId', async (request, response) => {
  try {
    const { userId, assignmentId } = request.params;

    console.log("assID is ", assignmentId);
    // Assuming you have a database connection and assignment collection
    //const asscollection = await client.db('colearn').collection('assignment');
    //console.log("all asses: ", asscollection);
    const assignment = await client.db('colearnDb').collection('assignment').findOne({ _id: new ObjectId(assignmentId) });
    const submission = await client.db('colearnDb').collection('submission').findOne({ studentId: new ObjectId(userId), assignmentId: new ObjectId(assignmentId) });
    console.log(assignment);
    if (!assignment) {
      console.log("here here");
      return response.status(404).json({ error: 'Assignment not found' });
    }

    // Send the assignment object as the response
    if (!submission) {
      const returnObject = {
        assignment: assignment,
        submission,
        submitted: false
      }
      response.json(returnObject);
    }
    else {
      const returnObject = {
        assignment: assignment,
        submission: submission,
        submitted: true
      }
      response.json(returnObject);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


//get assignment -teacher
router.get('/t/:userId/topic/:topicId/assignment/:assignmentId', async (request, response) => {
  try {
    const { userId, assignmentId } = request.params;

    console.log("assID is ", assignmentId);
    // Assuming you have a database connection and assignment collection
    //const asscollection = await client.db('colearn').collection('assignment');
    //console.log("all asses: ", asscollection);
    const assignment = await client.db('colearnDb').collection('assignment').findOne({ _id: new ObjectId(assignmentId) });
    console.log(assignment);
    if (!assignment) {
      return response.status(404).json({ error: 'Assignment not found' });
    }

    // Send the assignment object as the response
    response.json(assignment);
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


//upload submission -student
router.post('/s/:userId/assignment/:assignmentId/submission', async (request, response) => {

  if (!request.body.submission.files) {

    return response.status(404).json({ error: 'No submission files' });
  }
  try {
    const { userId, assignmentId } = request.params;
    const { submission } = request.body;

    console.log("submission for assId: ", assignmentId);
    // Assuming you have a database connection and assignment collection
    //const asscollection = await client.db('colearn').collection('assignment');
    //console.log("all asses: ", asscollection);
    const assignment = await client.db('colearnDb').collection('assignment').findOne({ _id: new ObjectId(assignmentId) });

    if (!assignment) {
      return response.status(404).json({ error: 'Assignment does not exist' });
    }

    const submissionObject = {
      assignmentId: new ObjectId(assignmentId),
      studentId: new ObjectId(userId),
      obtainedmarks: -1,
      marked: submission.marked,
      late: submission.late,
      files: submission.files,
      weaktags
    }

    await client.db('colearnDb').collection('submission').insertOne(submissionObject);


    // Send the assignment object as the response
    response.status(200).json('submitted successfully!');;
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//upload material -teacher
router.post('/t/:userId/class/:classId/week/:weekId/topic/:topicId/material', async (request, response) => {
  try {
    const { topicId } = request.params;
    const { material } = request.body;

    console.log("material to be added ", material);

    const materialObject = {
      topicId: new ObjectId(topicId),
      title: material.title,
      description: material.description,
      uploadtime: new Date(),
      files: material.files
    }

    await client.db('colearnDb').collection('material').insertOne(materialObject);


    // Send the assignment object as the response
    response.status(200).json('material added successfully!');;
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//delete material -teacher
router.delete('/t/:userId/class/:classId/week/:weekId/topic/:topicId/material/:matterialId', async (request, response) => {
  try {
    const { topicId, materialId } = request.params;

    // Delete the material from the database
    const result = await client.db('colearnDb').collection('material').deleteOne({
      _id: new ObjectId(materialId),
      topicId: new ObjectId(topicId)
    });

    if (result.deletedCount === 0) {
      // If no material was deleted, return an error response
      response.status(404).json({ error: 'Material not found' });
    } else {
      // If material was deleted successfully, return a success response
      response.status(200).json('Material deleted successfully');
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});
//get material -teacher
router.get('/t/:userId/class/:classId/week/:weekId/topic/:topicId/material/:materialId', async (request, response) => {
  try {
    const { topicId, materialId } = request.params;

    // Delete the material from the database
    const result = await client.db('colearnDb').collection('material').findOne({
      _id: new ObjectId(materialId),
      topicId: new ObjectId(topicId)
    });

    if (!result) {
      // If no material was deleted, return an error response
      response.status(404).json({ error: 'Material not found' });
    } else {
      // If material was deleted successfully, return a success response
      response.json(result);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//get material -student
router.get('/s/:userId/class/:classId/week/:weekId/topic/:topicId/material/:materialId', async (request, response) => {
  try {
    const { topicId, materialId } = request.params;

    // Delete the material from the database
    const result = await client.db('colearnDb').collection('material').findOne({
      _id: new ObjectId(materialId),
      topicId: new ObjectId(topicId)
    });

    if (!result) {
      // If no material was deleted, return an error response
      response.status(404).json({ error: 'Material not found' });
    } else {
      // If material was deleted successfully, return a success response
      response.json(result);
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//get submissions -teacher
router.get('/t/:userId/assignment/:assignmentId/submissions', async (request, response) => {
  try {
    const { userId, assignmentId } = request.params;

    const assignment = await client.db('colearnDb').collection('assignment').findOne({ _id: new ObjectId(assignmentId) });

    if (!assignment) {
      return response.status(404).json({ error: 'Assignment does not exist' });
    }

    const submissions = await client.db('colearnDb').collection('submission').find({ assignmentId: new ObjectId(assignmentId) }).toArray();

    if (submissions.length > 0) {
      const studentIds = [];//= submissions.map((submission) => submission.studentId).toArray();
      for (let i = 0; i < submissions.length; i++) {
        studentIds.push(submissions[i].studentId);
      }

      const students = await client.db('colearnDb').collection('user').find({ _id: { $in: studentIds } }).toArray();

      const submissionData = submissions.map((submission) => {
        const student = students.find((student) => student._id.equals(submission.studentId));
        return {
          student: student,
          submission: submission
        };
      });

      response.status(200).json(submissionData);
    } else {
      return response.status(404).json({ error: 'No submissions yet.' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});

//get specific submission -teacher
router.get('/t/:userId/assignment/:assignmentId/submission/:submissionId/files', async (request, response) => {
  try {
    const { submissionId } = request.params;

    const submission = await client.db('colearnDb').collection('submission').findOne({ _id: new ObjectId(submissionId) });

    if (submission) {
      response.status(200).json(submission);
    } else {
      return response.status(404).json({ error: 'No submission found.' });
    }
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


//update obtainedmarks and weakTags in submissions -teacher
router.put('/t/:userId/assignment/:assignmentId/submissions/save', async (request, response) => {
  try {
    const { userId, assignmentId } = request.params;
    const { updatedSubmissions } = request.body;
    console.log("in save api: ", updatedSubmissions);
    console.log("hehe")

    // Assuming you have a database connection and submission collection
    const submissionCollection = client.db('colearnDb').collection('submission');

    // Update each submission with the obtained marks
    for (let i = 0; i < updatedSubmissions.length; i++) {
      //console.log("in looping");
      const { _id, obtainedmarks, weaktags } = updatedSubmissions[i];
      //console.log("tags: ", weaktags);
      //console.log("marks: ", obtainedmarks);
      await submissionCollection.updateOne({ _id: new ObjectId(_id), assignmentId: new ObjectId(assignmentId) }, { $set: { obtainedmarks, marked: true, weaktags } });
    }

    response.status(200).json({ message: 'Submissions updated successfully' });


  } catch (error) {
    console.error(error);
    response.status(500).json({ error: 'Internal server error' });
  }
});


//run recommender script
function recommendMaterial(weaknessTags, studentLevel, materialData) {
  let relevantMaterials = materialData.filter(material => {
    return material.tags.some(tag => weaknessTags.includes(tag));// && material.level === studentLevel;
  });

  let materialScores = relevantMaterials.map(material => {
    let materialTags = material.tags;
    let tagIntersection = weaknessTags.filter(tag => materialTags.includes(tag));
    let score = tagIntersection.length / weaknessTags.length;
    return { material, score };
  });

  materialScores.sort((a, b) => b.score - a.score);

  let recommendedMaterials = [];
  let matchedWeaknesses = new Set();

  for (let { material, score } of materialScores) {
    if (material.tags.some(tag => weaknessTags.includes(tag))) {
      recommendedMaterials.push({ material, score });
      material.tags.forEach(tag => {
        if (weaknessTags.includes(tag)) {
          matchedWeaknesses.add(tag);
        }
      });

      if (matchedWeaknesses.size === weaknessTags.length) {
        break; // Stop iterating if all weaknesses are covered
      }
    }
  }

  recommendedMaterials.sort((a, b) => b.score - a.score);

  let materialsWithSameLevel = recommendedMaterials.filter(({ material }) => material.level === studentLevel);

  if (materialsWithSameLevel.length > 0) {
    return materialsWithSameLevel;
  }

  // If no materials found for the same level, recommend one material per weakness, ignoring level

  console.log("recommended length: ", recommendedMaterials.length)
  if (recommendedMaterials.length > 0) {
    console.log("last resort execution")
    let uniqueWeaknesses = new Set(weaknessTags);
    let recommendedMaterialsLastResort = [];

    for (let { material, score } of recommendedMaterials) {
      material.tags.forEach(tag => {
        if (uniqueWeaknesses.has(tag)) {
          uniqueWeaknesses.delete(tag);
          recommendedMaterialsLastResort.push({ material, score });
        }
      });

      if (uniqueWeaknesses.size === 0) {
        break; // Stop iterating if all weaknesses are covered
      }
    }
    console.log("last resort length: ", recommendedMaterialsLastResort.length)

    return recommendedMaterialsLastResort;
  }
  return []; // Return an empty array if no materials found
}

//store recommendations
async function storeRecommendations(results, students) {
  try {
    const submissions = client.db("colearnDb").collection('submission');
    const helpingmaterials = client.db("colearnDb").collection('helpingmaterial');

    for (let i = 0; i < students.length; i++) {
      const student = students[i];
      const submissionId = student.subId;
      const recommendation = results[submissionId];

      // Find the submission with the given submissionId
      const submission = await submissions.findOne({ _id: new ObjectId(submissionId) });

      if (submission) {
        // Update the recommended attribute with the recommended materials
        let recommendations = []
        for (let j = 0; j < recommendation.length; j++) {
          console.log("finding: ", recommendation[j].material._id)
          const material = await helpingmaterials.findOne({ _id: new ObjectId(recommendation[j].material._id) })
          console.log(material);
          recommendations = [...recommendations, material.file]
          console.log("recommended ", recommendation[j].material)
        }
        await submissions.updateOne(
          { _id: new ObjectId(submissionId) },
          { $set: { recommended: recommendations } }
        );
      }
    }
  } catch (error) {
    // Handle the error appropriately
    console.log("oh no! cant place recommendations because ", error);
  }
}

//save marks and weaknesses and prompt recommender
router.get('/t/:userId/assignment/:assignmentId/recommend', async (request, response) => {
  try {
    const assignmentId = new ObjectId(request.params.assignmentId);

    const submissions = await client.db('colearnDb').collection('submission')
      .find({ assignmentId: assignmentId })
      .sort({ obtainedMarks: -1 }) // Sort in descending order based on obtainedMarks
      .toArray();

    const helpingMaterials = await client.db('colearnDb').collection('helpingmaterial').find().toArray();
    let materials = [];
    for (let i = 0; i < helpingMaterials.length; i++) {
      materials.push({ _id: helpingMaterials[i]._id, tags: helpingMaterials[i].tags, level: helpingMaterials[i].level })
    }

    //console.log("materials: ", materials);
    const assignment = await client.db('colearnDb').collection('assignment').findOne({ _id: assignmentId });
    const totalMarks = assignment.totalmarks;

    let totalObtainedMarks = 0;
    submissions.forEach(submission => {
      totalObtainedMarks += submission.obtainedMarks;
    });

    const average = totalObtainedMarks / submissions.length;

    const partitionSize = Math.ceil(submissions.length / 3);
    let count = 0;
    let index1 = 0;
    let index2 = 0;
    let students = [];
    for (let i = 0; i < submissions.length && index2 == 0; i++) {
      if (count < partitionSize) {
        count = count + 1;
      }
      else if (count == partitionSize) {
        if (index1 != 0) {
          index2 = i + 1;
        }
        else {
          index1 = i + 1;
        }
      }
    }

    for (let i = 0; i < index1; i++) {
      students.push({ subId: submissions[i]._id, weaktags: submissions[i].weaktags, level: "difficult" });
    }

    for (let i = index1; i < index2; i++) {
      students.push({ subId: submissions[i]._id, weaktags: submissions[i].weaktags, level: "medium" });
    }

    for (let i = index2; i < submissions.length; i++) {
      students.push({ subId: submissions[i]._id, weaktags: submissions[i].weaktags, level: "easy" });
    }

    //console.log("students: ", students);

    let results = {};
    for (let i = 0; i < students.length; i++) {
      let studentLevel = students[i].level;
      let tags = students[i].weaktags;
      //materials is array of helping material {_id, tags, level}
      //run pyhton script here
      //const pythonProcess = spawn('python', ['main.py', student_level, tags.join(','), JSON.stringify(helpingMaterials)]);
      results[students[i].subId] = recommendMaterial(tags, studentLevel, helpingMaterials);
      console.log("weakness: ", students[i].weaktags, " level: ", students[i].level)
      console.log("material: ");
      for (let j = 0; j < results[students[i].subId].length; j++) {
        console.log(results[students[i].subId][j].material.tags);
      }
    }
    console.log(results);
    response.json(results);
    storeRecommendations(results, students);
  }
  catch (error) {
    console.log("ERROR: ", error);
    response.status(500).json({ message: "internal sever error" });
  }
});

module.exports = router