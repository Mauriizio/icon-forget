const fs = require("fs");
const path = require("path");

const cliPath = path.join(__dirname, "..", "src", "cli.js");

if (!fs.existsSync(cliPath)) {
  console.error("CLI entry point missing:", cliPath);
  process.exit(1);
}

console.log("ICONFULL CLI build check complete.");
