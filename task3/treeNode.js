const fs = require('fs');
const path = require('path');

function tree(dirPath, depth = Infinity, indent = '') {
  if (depth < 0) return;

  fs.readdir(dirPath, (err, files) => {
    if (err) throw err;

    fs.stat(dirPath, (err, stats) => {
      if (err) throw err;

      const isDirectory = stats.isDirectory();

      if (!isDirectory) {
        //console.log(indent + dirPath);
        return;
      }
      //console.log(indent + dirPath);

      files.forEach((file, index) => {
        const filePath = path.join(dirPath, file);

        fs.stat(filePath, (err, fileStats) => {

          if (err) throw err;
          const prefix = index === files.length - 1 ? '└──' : '├──';
          const nestedIndent = indent + (index === files.length - 1 ? ' ' : '│');

          if (fileStats.isDirectory()) {
            tree(filePath, depth - 1, nestedIndent);
          } else {
            console.log(indent + prefix + ' ' + dirPath);
            console.log(nestedIndent + prefix + ' ' + file);
          }
        });
      });
    });
  });
}

const args = process.argv.slice(2);
const dirPath = args[0];
const depthFlag = args.find((arg) => arg === '--depth' || arg === '-d');
const depthValueIndex = args.indexOf(depthFlag) + 1;

let depth = Infinity;
if (depthFlag && depthValueIndex < args.length) {
  depth = parseInt(args[depthValueIndex]);
}

tree(dirPath, depth);

//Результат вывода:
//node treeNode.js C:\Users\User\projects\node --depth 2
//├── C:\Users\User\projects\node
//│├── index.js
//│├── C:\Users\User\projects\node\domain 
//││├── error.js
//│└── C:\Users\User\projects\node\cluster
//│ └── index.js
//│├── C:\Users\User\projects\node\domain 
//││├── flow.js
//│└── C:\Users\User\projects\node\domain
//│ └── run.js
//│├── C:\Users\User\projects\node\errors
//││├── counter.js
//│└── C:\Users\User\projects\node\errors
//│ └── try-catch.js
