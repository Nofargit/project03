
const express = require('./node_modules/express');
const router = express.Router();
const loginHandler = require('../../handlers/mainHandler')


router.post('/api/Main', (req,res) =>
{
    // loginHandler.GetToken(req,res)
    console.log('hello ')
})


module.exports= router;
