let fs = require("fs");
let path = require("path");

function treeFn(dirPath) {
  if (dirPath == undefined) {
    console.log("Kindly enter the path");
    return;
  } else {
    let doesExist = fs.existsSync(dirPath);
    if (doesExist) {
      treeHelper(dirPath, "");
    } else {
      console.log("Kindly enter the correct path");
      return;
    }
  }
}

function treeHelper(dirPath, indent) {
  // check whether it is a file or folder using lstatSync
  let isFile = fs.lstatSync(dirPath).isFile();
  if (isFile == true) {
    let fileName = path.basename(dirPath);
    console.log(indent + "├──" + fileName);
  } else {
    let dirName = path.basename(dirPath);
    console.log(indent + "└──" + dirName);
    let children = fs.readdirSync(dirPath);
    for (let i = 0; i < children.length; i++) {
      let childPath = path.join(dirPath, children[i]);
      treeHelper(childPath, indent + "\t");
    }
  }
}

module.exports = {
  treeKey: treeFn,
};
