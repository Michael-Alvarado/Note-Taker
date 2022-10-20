const fs = require('fs');
const path = require('path');
const {readFile, writeFile, readWriteFile} = require('../helpers/utils');
const { v4: uuidv4 } = require('uuid');
const router = require('express').Router();
const db = require('../db/db.json');

router.get('/', (req, res) => {
    readFile('db/db.json').then((data) => res.json(JSON.parse(data)))
});

router.post('/', (req, res) => {
    const {title, text} = req.body;

    if(req.body) {
        const newNote = {
            title,
            text, 
            id: uuidv4(),
        };
        readWriteFile(newNote, 'db/db.json');
        res.json(newNote);
    } else {
        res.errored('Error adding note to file');
    }
});

router.delete('/:id', (req, res) => {
    const remainingNotes = db.filter((data) => data.id !== req.params.id);
    writeFile('db/db.json', remainingNotes);
    res.json(remainingNotes);
});

module.exports = router;

