let fs = require("fs");
let path = require("path");
let { treeKey } = require("./commands/tree");
let { organizeKey } = require("./commands/organize");
let { helpKey } = require("./commands/help");
const tree = require("./commands/tree");

let inputArr = process.argv.slice(2);
console.log(inputArr);

let command = inputArr[0];

switch (command) {
  case "tree":
    treeKey(inputArr[1]);
    break;
  case "organize":
    organizeKey(inputArr[1]);
    break;
  case "help":
    helpKey();
    break;
  default:
    console.log("Wrong command");
    break;
}
