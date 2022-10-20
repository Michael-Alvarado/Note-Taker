const fs = require('fs');
const util = require('util');

const readFile = util.promisify(fs.readFile);

// Function to write data to the database JSON file at provided location with provided data
const writeFile = (filePath, data) => {
    fs.writeFile(filePath, JSON.stringify(data, null, 4), (err) => {
        err ? console.error(err) : console.log(`Data successfully written to ${filePath}`)
    });
};

// Function to read data from file provided and add additional content to provided file
const readWriteFile = (newData, file) => {
    fs.readFile(file, 'UTF8', (err, data) => {
        if(err) {
            console.error(err);
        } else {
            let parseData = JSON.parse(data);
            parseData.push(newData);
            writeFile(file, parseData);
        }
    });
};

module.exports = { readFile, writeFile, readWriteFile };