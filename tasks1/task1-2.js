const path = require('path');
const fs = require('fs');
const csv = require('csvtojson/v2');
const stream = require('stream');

const readStream = fs.createReadStream(path.resolve(__dirname, 'files', 'nodejs-hw1-ex1.csv'));
const writeStream = fs.createWriteStream(path.resolve(__dirname, 'files', 'test.txt'));
const csvStream = csv({constructResult: false, toArrayString: true, delimiter: ';'}).subscribe((jsonObj) => {
    delete jsonObj.Amount
    return Promise.resolve()
})

async function work () {
    await stream.pipeline(readStream, csvStream, writeStream, (err => {
        if(err) {
            console.log(err)
        }
        console.log('Success')
    }))
}

work();

