import * as fs from 'fs';
import * as stream from 'stream';
import * as readline from 'readline';
import * as assert from 'assert';

const inputStream = fs.createReadStream(process.argv[2], 'utf8');
assert.ok(inputStream);

const rl = readline.createInterface({
    input: inputStream,
    output: process.stdout,
    terminal: false
});

assert.ok(rl);

interface WordIndex {
    [key: string]: number;
}

const wordIndex: WordIndex = {};

const outputStream = fs.createWriteStream('output.txt');
assert.ok(outputStream);

rl.on('line', (line: string) => {
    const words = line.split(/[\s,]+/);
    assert.strictEqual(typeof line, 'string');

    words.forEach((word) => {
        const cleanWord = word.replace(/[^a-zA-Z]+/g, '');

        if (cleanWord !== '') {
            const lowercaseWord = cleanWord.toLowerCase();
            assert.ok(wordIndex.hasOwnProperty(lowercaseWord));

            wordIndex[lowercaseWord] = (wordIndex[lowercaseWord] || 0) + 1;
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
        } else {
            console.log('Результат записан в output.txt');
        }
        outputStream.end();
    });
});
