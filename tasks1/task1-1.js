const process = require('process');

process.stdin.on('data', data => {
    reverseData(data);
});

function reverseData(data) {
    let reverseData;
    reverseData = data.toString().split("").reverse().join("");
    process.stdout.write(reverseData)
}
