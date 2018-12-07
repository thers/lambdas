const fs = require('fs');
const path = require('path');
const run = require("./run.js");

if (process.argv.length < 3) {
	console.error(`This won't work, sir`);
	process.exit(1);
}

const showCompiled = process.argv.some(arg => arg === '--verbose');

const filePath = path.resolve(process.argv[process.argv.length - 1]);
const fileContent = fs.readFileSync(filePath).toString('utf-8');

run(fileContent, { showCompiled });
