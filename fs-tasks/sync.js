const fs = require('fs');
const path = require('path');

// 1. Функция записи в файл
function writeFile(filePath, data) {
    fs.writeFileSync(filePath, data);
    console.log(`Файл ${filePath} записан`);
}

// 2. Функция чтения из файла
function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}

// 3. Изменение информации в файле
function updateFile(filePath, newData) {
    fs.writeFileSync(filePath, newData);
    console.log(`Файл ${filePath} обновлен`);
}

// 4. Удаление информации из файла
function clearFile(filePath) {
    fs.writeFileSync(filePath, '');
    console.log(`Файл ${filePath} очищен`);
}

// 5. Удаление шума (цифры, большие -> маленькие)
function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\d/g, ''); // удаляем цифры
    content = content.toLowerCase(); // в нижний регистр
    fs.writeFileSync(filePath, content);
    console.log(`Файл ${filePath} очищен от шума`);
}

// 6. Копирование файла
function copyFile(src, dest) {
    fs.copyFileSync(src, dest);
    console.log(`Файл скопирован из ${src} в ${dest}`);
}

// 7. Создание папки
function createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Папка ${dirPath} создана`);
    }
}

// 8. Удаление папки
function removeDir(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true });
        console.log(`Папка ${dirPath} удалена`);
    }
}

// 9. Вывод путей ко всем файлам (кроме служебных)
function getAllFiles(dir = '.', result = []) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
        
        // Пропускаем служебные папки
        if (item === 'node_modules' || item === '.git' || item.startsWith('.')) {
            return;
        }
        
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            getAllFiles(fullPath, result);
        } else {
            result.push(fullPath);
        }
    });
    
    return result;
}

// 10. Удаление всех файлов и папок (кроме служебных)
function cleanProject() {
    console.log('\nОчистка проекта...');
    const items = fs.readdirSync('.');
    
    items.forEach(item => {
        // Не удаляем служебные файлы и папки
        if (item === 'node_modules' || item === '.git' || item.startsWith('.env') || item === 'package.json') {
            console.log(`Пропускаем: ${item}`);
            return;
        }
        
        const fullPath = path.join('.', item);
        try {
            if (fs.statSync(fullPath).isDirectory()) {
                fs.rmSync(fullPath, { recursive: true });
                console.log(`Удалена папка: ${item}`);
            } else {
                fs.unlinkSync(fullPath);
                console.log(`Удален файл: ${item}`);
            }
        } catch (err) {
            console.log(`Ошибка при удалении ${item}:`, err.message);
        }
    });
}

// Экспорт функций
module.exports = {
    writeFile,
    readFile,
    updateFile,
    clearFile,
    cleanFile,
    copyFile,
    createDir,
    removeDir,
    getAllFiles,
    cleanProject
};

// Тестовые функции
function testSyncFunctions() {
    console.log('\nТестирование синхронных функций');
    
    // Создаем тестовую папку и файл
    createDir('test-folder');
    writeFile('test-folder/test.txt', 'Hello World 123 ABC');
    
    // Чтение
    const content = readFile('test-folder/test.txt');
    console.log('Прочитано:', content);
    
    // Очистка от шума
    cleanFile('test-folder/test.txt');
    console.log('После очистки:', readFile('test-folder/test.txt'));
    
    // Копирование
    copyFile('test-folder/test.txt', 'test-folder/copy.txt');
    
    // Показать все файлы
    const allFiles = getAllFiles();
    console.log('\nВсе файлы в проекте:', allFiles.length);
    allFiles.slice(0, 5).forEach(file => console.log('  -', file));
    
    // Удаляем тестовую папку
    removeDir('test-folder');
    console.log('\n Тест завершен');
}

// Если файл запускается напрямую
if (require.main === module) {
    testSyncFunctions();
}