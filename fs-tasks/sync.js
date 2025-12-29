const fs = require('fs');
const path = require('path');
function writeFile(filePath, data) {
    fs.writeFileSync(filePath, data);
    console.log(`Файл ${filePath} записан`);
}
function readFile(filePath) {
    return fs.readFileSync(filePath, 'utf8');
}
function updateFile(filePath, newData) {
    fs.writeFileSync(filePath, newData);
    console.log(`Файл ${filePath} обновлен`);
}
function clearFile(filePath) {
    fs.writeFileSync(filePath, '');
    console.log(`Файл ${filePath} очищен`);
}
function cleanFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    content = content.replace(/\d/g, ''); 
    content = content.toLowerCase(); 
    fs.writeFileSync(filePath, content);
    console.log(`Файл ${filePath} очищен от шума`);
}
function copyFile(src, dest) {
    fs.copyFileSync(src, dest);
    console.log(`Файл скопирован из ${src} в ${dest}`);
}
function createDir(dirPath) {
    if (!fs.existsSync(dirPath)) {
        fs.mkdirSync(dirPath, { recursive: true });
        console.log(`Папка ${dirPath} создана`);
    }
}
function removeDir(dirPath) {
    if (fs.existsSync(dirPath)) {
        fs.rmSync(dirPath, { recursive: true });
        console.log(`Папка ${dirPath} удалена`);
    }
}
function getAllFiles(dir = '.', result = []) {
    const items = fs.readdirSync(dir);
    
    items.forEach(item => {
        const fullPath = path.join(dir, item);
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
function cleanProject() {
    console.log('\nОчистка проекта...');
    const items = fs.readdirSync('.');
    
    items.forEach(item => {
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
function testSyncFunctions() {
    console.log('\nТестирование синхронных функций');
    createDir('test-folder');
    writeFile('test-folder/test.txt', 'Hello World 123 ABC');
    const content = readFile('test-folder/test.txt');
    console.log('Прочитано:', content);
    cleanFile('test-folder/test.txt');
    console.log('После очистки:', readFile('test-folder/test.txt'));
    copyFile('test-folder/test.txt', 'test-folder/copy.txt');
    const allFiles = getAllFiles();
    console.log('\nВсе файлы в проекте:', allFiles.length);
    allFiles.slice(0, 5).forEach(file => console.log('  -', file));
    removeDir('test-folder');
    console.log('\n Тест завершен');
}
if (require.main === module) {
    testSyncFunctions();
}
