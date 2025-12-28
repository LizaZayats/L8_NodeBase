const { fetchData } = require('./modules/fetchModule');
const { sortStringsIgnoringSpaces } = require('./modules/sortModule');
const { createDir, writeFile } = require('./modules/fsModule');

async function main() {
    console.log('Использование кастомных модулей \n');
    
    try {
        // 1. Загрузка пользователей
        console.log('1. Загрузка пользователей...');
        const result = await fetchData('https://jsonplaceholder.typicode.com/users');
        
        if (result.error) {
            throw result.error;
        }
        
        const users = result.data;
        console.log(`Загружено ${users.length} пользователей\n`);
        
        // 2. Сортировка по именам
        console.log('2. Сортировка имен...');
        const names = users.map(user => user.name);
        const sortedNames = sortStringsIgnoringSpaces(names);
        
        console.log('Первые 5 отсортированных имен:');
        sortedNames.slice(0, 5).forEach((name, i) => {
            console.log(`  ${i + 1}. ${name}`);
        });
        console.log();
        
        // 3. Создание структуры папок
        console.log('3. Создание структуры папок...');
        createDir('users');
        console.log('Папка users создана\n');
        
        // 4. Запись имен в файл
        console.log('4. Запись имен в файл...');
        const namesContent = sortedNames.join('\n');
        writeFile('users/names.txt', namesContent);
        console.log('Имена записаны в users/names.txt\n');
        
        // 5. Запись email в файл
        console.log('5. Запись email в файл...');
        const emails = users.map(user => user.email).sort();
        const emailsContent = emails.join('\n');
        writeFile('users/emails.txt', emailsContent);
        console.log('Email записаны в users/emails.txt\n');
        
        // 6. Вывод статистики
        console.log('Статистика');
        console.log('Всего пользователей:', users.length);
        console.log('Уникальных email:', new Set(emails).size);
        console.log('Самый длинный email:', emails.reduce((a, b) => a.length > b.length ? a : b));
        console.log('\nЗадание выполнено успешно!');
        
    } catch (error) {
        console.error('Ошибка:', error.message);
    }
}
main();