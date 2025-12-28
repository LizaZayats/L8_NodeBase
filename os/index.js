const os = require('os');
const path = require('path');

// Загружаем .env из родительской папки
require('dotenv').config({ path: path.join(__dirname, '..', '.env') });

// a) Функция вывода основной информации
function getOSInfo() {
    console.log('\nИнформация об ОС');
    console.log('Платформа:', os.platform());
    console.log('Архитектура:', os.arch());
    console.log('Версия ОС:', os.version());
    console.log('Имя хоста:', os.hostname());
    console.log('Домашняя директория:', os.homedir());
    console.log('Свободная память (GB):', (os.freemem() / 1024 / 1024 / 1024).toFixed(2));
    console.log('Всего памяти (GB):', (os.totalmem() / 1024 / 1024 / 1024).toFixed(2));
    
    console.log('\nСетевые интерфейсы:');
    const networks = os.networkInterfaces();
    Object.keys(networks).forEach(interfaceName => {
        networks[interfaceName].forEach(net => {
            if (net.family === 'IPv4' && !net.internal) {
                console.log(`  ${interfaceName}: ${net.address}`);
            }
        });
    });
}

// b) Проверка свободной памяти (> 4GB)
function checkMemory() {
    const freeMemGB = os.freemem() / 1024 / 1024 / 1024;
    console.log(`\nСвободная память: ${freeMemGB.toFixed(2)} GB`);
    
    if (freeMemGB > 4) {
        console.log('Свободной памяти больше 4GB');
        return true;
    } else {
        console.log('Свободной памяти меньше 4GB');
        return false;
    }
}

// c) Функция с проверкой доступа
function getOSInfoIfAllowed() {
    const mode = process.env.ACCESS_MODE; // Используем ACCESS_MODE из .env
    console.log(`\nТекущий режим доступа: ${mode}`);
    
    if (mode === 'admin' || mode === 'user') {
        console.log('Доступ разрешен');
        getOSInfo();
        checkMemory();
    } else {
        console.log('Доступ запрещен. Требуется режим "admin" или "user"');
    }
}

// Экспорт функций
module.exports = {
    getOSInfo,
    checkMemory,
    getOSInfoIfAllowed
};

// Если файл запускается напрямую
if (require.main === module) {
    getOSInfoIfAllowed();
}