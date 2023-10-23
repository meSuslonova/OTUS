const fs = require('fs');
const path = require('path');
const { promisify } = require('util');

const readdirAsync = promisify(fs.readdir);
const statAsync = promisify(fs.stat);

async function buildTree(dirPath, depth = Infinity, indent = '') {
    const files = await readdirAsync(dirPath);
    const tree = {};

    for (let i = 0; i < files.length; i++) {
        const file = files[i];
        const filePath = path.join(dirPath, file);

        const fileStats = await statAsync(filePath);
        const isDirectory = fileStats.isDirectory();

        if (depth > 0 && isDirectory) {
            tree[file] = await buildTree(filePath, depth - 1, ' ' + indent);
        } else {
            tree[file] = isDirectory ? {} : null;
        }
    }

    return tree;
}

async function printTree(tree, indent = '') {
    const keys = Object.keys(tree);

    for (let i = 0; i < keys.length; i++) {
        const file = keys[i];
        const isLast = i === keys.length - 1;
        const prefix = isLast ? '└── ' : '├── ';
        const nestedIndent = indent + (isLast ? ' ' : '│ ');

        console.log(indent + prefix + file);

        if (tree[file] !== null) {
            await printTree(tree[file], nestedIndent);
        }
    }
}

async function main() {
    const args = process.argv.slice(2);
    const dirPath = args[0];
    const depthFlag = args.find((arg) => arg === '--depth' || arg === '-d');
    const depthValueIndex = args.indexOf(depthFlag) + 1;
    let depth = Infinity;

    if (depthFlag && depthValueIndex < args.length) {
        depth = parseInt(args[depthValueIndex]);
    }

    const tree = await buildTree(dirPath, depth);
    await printTree(tree);
}

main().catch(error => {
    console.log(error);
});

// Результат вывода
// node treeNode.js C:\Users\task_3 --depth 2
// ├── cluster
// │ └── index.js
// ├── domain
// │ ├── error.js
// │ ├── flow.js
// │ └── run.js
// ├── errors
// │ ├── counters.js
// │ └── try-catch.js
// ├── index.js
// └── worker
