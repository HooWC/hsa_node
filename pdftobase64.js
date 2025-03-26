const fs = require("fs");

const base64String = fs.readFileSync("Y:\\SCAN HANVAN\\A-HVN 755-2022 (CLOSE PLAN).pdf", {encoding: 'base64'});

fs.writeFileSync("d:\\abc.txt", base64String);
//console.log(base64String);