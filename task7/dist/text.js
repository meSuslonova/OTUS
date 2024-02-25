"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
        desc = { enumerable: true, get: function () { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function (o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function (o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function (o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const fs = __importStar(require("fs"));
const readline = __importStar(require("readline"));
const assert = __importStar(require("assert"));
const inputStream = fs.createReadStream(process.argv[2], 'utf8');
assert.ok(inputStream);
const rl = readline.createInterface({
    input: inputStream,
    output: process.stdout,
    terminal: false
});
assert.ok(rl);
const wordIndex = {};
const outputStream = fs.createWriteStream('output.txt');
assert.ok(outputStream);
rl.on('line', (line) => {
    const words = line.split(/[\s,]+/);
    assert.strictEqual(typeof line, 'string');
    words.forEach((word) => {
        const cleanWord = word.replace(/[^a-zA-Z]+/g, '');
        if (cleanWord !== '') {
            const lowercaseWord = cleanWord.toLowerCase();

            // Проверяем, существует ли свойство, и если нет, инициализируем его нулем
            if (!wordIndex.hasOwnProperty(lowercaseWord)) {
                wordIndex[lowercaseWord] = 0;
            }

            // Увеличиваем счетчик
            wordIndex[lowercaseWord]++;
        }
    });
});
rl.on('close', () => {
    const sortedWords = Object.keys(wordIndex).sort();
    const wordVector = sortedWords.map((word) => wordIndex[word]);
    assert.strictEqual(typeof wordVector, 'object');
    assert.strictEqual(typeof outputStream.write, 'function');
    assert.strictEqual(typeof outputStream.end, 'function');
    outputStream.write(wordVector.join(', '), (err) => {
        if (err) {
            console.error('Ошибка при записи в файл: ' + err);
        }
        else {
            console.log('Результат записан в output.txt');
        }
        outputStream.end();
    });
});
