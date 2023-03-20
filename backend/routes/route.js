const express = require('express')
const router = express.Router()
const userTemplateCopy = require('../models/usermodel')

router.post('/signup', (request, response)=> {
    const user = new userTemplateCopy({
        firstName: request.body.firstName,
        lastName: request.body.lastName,
        email: request.body.email,
        password: request.body.password,
        role: request.body.role
    })
    user.save()
    .then(data =>{
        response.json(data)
    })
    .catch(error =>{
        response.json(error)
    })
})

module.exports = router