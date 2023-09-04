let fs = require("fs");
let path = require("path");

let types = {
  media: ["mp4", "mkv"],
  archives: ["zip", "7z", "rar", "tar", "gz", "ar", "iso", "xz"],
  documents: [
    "docx",
    "doc",
    "pdf",
    "xlsx",
    "xls",
    "odt",
    "ods",
    "odp",
    "odg",
    "odf",
    "txt",
    "ps",
    "tex",
  ],
  app: ["exe", "dmg", "pkg", "deb"],
  images: ["png", "jpg", "jpeg"],
};

function organizeFn(dirPath) {
  let destPath = "";
  if (dirPath == undefined) {
    console.log("Kindly enter the path");
    return;
  } else {
    let doesExist = fs.existsSync(dirPath); // check whether the path exists or not
    if (doesExist) {
      destPath = path.join(dirPath, "organized_files");
      if (fs.existsSync(destPath) == false) {
        fs.mkdirSync(destPath);
      }
    } else {
      console.log("Kindly enter the correct path");
      return;
    }
  }

  organizeHelper(dirPath, destPath);
}

function organizeHelper(src, dest) {
  let childNames = fs.readdirSync(src);
  for (let i = 0; i < childNames.length; i++) {
    let childAddress = path.join(src, childNames[i]);
    let isFile = fs.lstatSync(childAddress).isFile();
    if (isFile) {
      let category = getCategory(childNames[i]);
      //   console.log(childNames[i], "belongs to --> ", category);
      sendFiles(childAddress, dest, category);
    }
  }
}

function getCategory(name) {
  let ext = path.extname(name);
  ext = ext.slice(1);
  for (let type in types) {
    let cTypeArray = types[type];
    for (let i = 0; i < cTypeArray.length; i++) {
      if (ext == cTypeArray[i]) {
        return type;
      }
    }
  }
  return "others";
}

function sendFiles(srcFilePath, dest, category) {
  let categoryPath = path.join(dest, category);
  if (fs.existsSync(categoryPath) == false) {
    fs.mkdirSync(categoryPath);
  }
  let fileName = path.basename(srcFilePath); // returns the file name
  let destFilePath = path.join(categoryPath, fileName);
  fs.copyFileSync(srcFilePath, destFilePath);
  //   fs.unlinkSync(srcFilePath); // deletes the file, can be used to cut the files
  console.log(fileName, "copied to ", category);
}

module.exports = {
  organizeKey: organizeFn,
};
