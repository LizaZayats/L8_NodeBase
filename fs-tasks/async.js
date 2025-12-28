const fs = require('fs/promises');
const path = require('path');

// 1. Асинхронная запись в файл
async function writeFileAsync(filePath, data) {
    await fs.writeFile(filePath, data);
    console.log(`Файл ${filePath} записан (async)`);
}

// 2. Асинхронное чтение из файла
async function readFileAsync(filePath) {
    return await fs.readFile(filePath, 'utf8');
}

// 3. Асинхронное изменение информации
async function updateFileAsync(filePath, newData) {
    await fs.writeFile(filePath, newData);
    console.log(`Файл ${filePath} обновлен (async)`);
}

// 4. Асинхронная очистка файла
async function clearFileAsync(filePath) {
    await fs.writeFile(filePath, '');
    console.log(`Файл ${filePath} очищен (async)`);
}

// 5. Асинхронная очистка от шума
async function cleanFileAsync(filePath) {
    let content = await fs.readFile(filePath, 'utf8');
    content = content.replace(/\d/g, '');
    content = content.toLowerCase();
    await fs.writeFile(filePath, content);
    console.log(`Файл ${filePath} очищен от шума (async)`);
}

// 6. Асинхронное копирование
async function copyFileAsync(src, dest) {
    await fs.copyFile(src, dest);
    console.log(`Файл скопирован из ${src} в ${dest} (async)`);
}

// 7. Асинхронное создание папки
async function createDirAsync(dirPath) {
    try {
        await fs.mkdir(dirPath, { recursive: true });
        console.log(`Папка ${dirPath} создана (async)`);
    } catch (err) {
        if (err.code !== 'EEXIST') throw err;
    }
}

// 8. Асинхронное удаление папки
async function removeDirAsync(dirPath) {
    try {
        await fs.rm(dirPath, { recursive: true });
        console.log(`Папка ${dirPath} удалена (async)`);
    } catch (err) {
        if (err.code !== 'ENOENT') throw err;
    }
}

// 9. Асинхронный вывод всех файлов
async function getAllFilesAsync(dir = '.', result = []) {
    const items = await fs.readdir(dir);
    
    for (const item of items) {
        const fullPath = path.join(dir, item);
        
        if (item === 'node_modules' || item === '.git' || item.startsWith('.')) {
            continue;
        }
        
        const stat = await fs.stat(fullPath);
        if (stat.isDirectory()) {
            await getAllFilesAsync(fullPath, result);
        } else {
            result.push(fullPath);
        }
    }
    
    return result;
}

// Экспорт функций
module.exports = {
    writeFileAsync,
    readFileAsync,
    updateFileAsync,
    clearFileAsync,
    cleanFileAsync,
    copyFileAsync,
    createDirAsync,
    removeDirAsync,
    getAllFilesAsync
};

// Тест асинхронных функций
async function testAsyncFunctions() {
    console.log('\nТестирование асинхронных функций');
    
    try {
        // Создаем тестовую папку и файл
        await createDirAsync('test-async');
        await writeFileAsync('test-async/test.txt', 'Async Test 456 XYZ');
        
        // Чтение
        const content = await readFileAsync('test-async/test.txt');
        console.log('Прочитано (async):', content);
        
        // Очистка от шума
        await cleanFileAsync('test-async/test.txt');
        const cleaned = await readFileAsync('test-async/test.txt');
        console.log('После очистки (async):', cleaned);
        
        // Показать все файлы
        const allFiles = await getAllFilesAsync();
        console.log('\nВсе файлы (async):', allFiles.length);
        
        // Удаляем тестовую папку
        await removeDirAsync('test-async');
        console.log('\nАсинхронный тест завершен');
        
    } catch (err) {
        console.error('Ошибка в асинхронном тесте:', err.message);
    }
}

// Если файл запускается напрямую
if (require.main === module) {
    testAsyncFunctions();
}