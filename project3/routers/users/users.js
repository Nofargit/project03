const express = require('express');
const router = express.Router();
const usersHandler = require('../../handlers/usersHandler')


router.post('/', (req,res) =>
{
    usersHandler.AddUser(req,res)
})


module.exports= router;
