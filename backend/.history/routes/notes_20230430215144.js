const express = require('express');
const Notes = require('../models/Notes');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');
const router = express.Router();

// Route 1
router.get('/fetchallnotes', fetchuser, async(req, res)=>{
    try {
        const notes = await Notes.find({user: req.user.id});
        res.json(notes);
    } catch (error) {
        console.error(error.message);
        res.status(500).send('Internet Server Error');
    }
})