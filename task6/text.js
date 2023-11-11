const fs = require('fs');
const stream = require('stream');
const readline = require('readline');

// Создаем поток для чтения входного текстового файла
const inputStream = fs.createReadStream(process.argv[2], 'utf8');

// Создаем поток для построчного чтения входных данных
const rl = readline.createInterface({
  input: inputStream,
  output: process.stdout,
  terminal: false
});

// Создаем объект для хранения индекса слов
const wordIndex = {};

// Создаем поток для записи результата
const outputStream = fs.createWriteStream('output.txt');

// Обработка каждой строки текста
rl.on('line', (line) => {
  // Разделяем строку на слова, учитывая пробел и запятую как разделители
  const words = line.split(/[\s,]+/);

  // Обрабатываем каждое слово
  words.forEach((word) => {
    // Фильтруем не-текстовые символы (удаляем запятые и другие символы)
    const cleanWord = word.replace(/[^a-zA-Z]+/g, '');

    if (cleanWord !== '') {
      // Приводим слово к нижнему регистру для учета регистра
      const lowercaseWord = cleanWord.toLowerCase();

      // Увеличиваем счетчик для данного слова в индексе
      wordIndex[lowercaseWord] = (wordIndex[lowercaseWord] || 0) + 1;
    }
  });
});

// Обработка окончания чтения файла
rl.on('close', () => {
  // Преобразуем индекс слов в массив
  const sortedWords = Object.keys(wordIndex).sort();
  const wordVector = sortedWords.map((word) => wordIndex[word]);

  // Записываем результирующий вектор в файл
  outputStream.write(wordVector.join(', '), (err) => {
    if (err) {
      console.error('Ошибка при записи в файл: ' + err);
    } else {
      console.log('Результат записан в output.txt');
    }
    outputStream.end();
  });
});

//node text.js text.txt
//Реузльтат: ab cb bss b -> [1, 1, 1, 1]
