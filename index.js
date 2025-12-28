// Загружаем переменные окружения
require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' :
          process.env.NODE_ENV === 'domain' ? '.env.domain' : '.env.development'
});

// Вывод информации
console.log('1. Информация из .env:');
console.log('   Имя:', process.env.NAME || 'Не указано');
console.log('   Фамилия:', process.env.SURNAME || 'Не указано');
console.log('   Группа:', process.env.GROUP || 'Не указано');
console.log('   Номер:', process.env.NUMBER_IN_LIST || 'Не указано');
console.log('   Режим:', process.env.ACCESS_MODE || 'development');
console.log();

// Меню для тестирования
console.log('2. Доступные команды:');
console.log('   npm start     - запуск в режиме development');
console.log('   npm run build - запуск в режиме production');
console.log('   npm run deploy - запуск в режиме domain');
console.log('   npm run os    - информация об ОС');
console.log('   npm run bcrypt - тест шифрования паролей');
console.log('   npm run fs-sync - тест синхронных файловых операций');
console.log('   npm run fs-async - тест асинхронных файловых операций');
console.log('   node use.js   - использование кастомных модулей');
console.log();

console.log('Проект готов к работе!');