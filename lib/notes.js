// Importing destructured methods from utils file
const {readFile, writeFile, readWriteFile} = require('../helpers/utils');
// Importing unique ID npm
const { v4: uuidv4 } = require('uuid');
// Importing express
const router = require('express').Router();
// Importing the database file
const db = require('../db/db.json');

// GETs previous notes from database file
router.get('/', (req, res) => {
    readFile('db/db.json').then((data) => res.json(JSON.parse(data)))
});

// POSTs note to database file 
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

// DELETEs note from list of notes on database file using a filter method
router.delete('/:id', (req, res) => {
    const remainingNotes = db.filter((data) => data.id !== req.params.id);
    writeFile('db/db.json', remainingNotes);
    console.log('Note deleted successfully!')
    res.json(remainingNotes);
});

module.exports = router;

