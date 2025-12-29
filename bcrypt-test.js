const bcrypt = require('bcryptjs');
const saltRounds = 10;

async function hashPasswords() {
    console.log('Хеширование 13 паролей\n');
    
    const passwords = Array(13).fill('mySecretPassword123');
    const times = [];
    
    for (let i = 0; i < passwords.length; i++) {
        const start = Date.now();
        const hash = await bcrypt.hash(passwords[i], saltRounds);
        const end = Date.now();
        const time = end - start;
        times.push(time);
        
        console.log(`Пароль ${i + 1}:`);
        console.log(`  Хеш: ${hash.substring(0, 30)}...`);
        console.log(`  Время: ${time}ms`);
    }
    
    console.log('\nАнализ времени');
    console.log('Минимальное время:', Math.min(...times), 'ms');
    console.log('Максимальное время:', Math.max(...times), 'ms');
    console.log('Среднее время:', (times.reduce((a, b) => a + b) / times.length).toFixed(2), 'ms');
    console.log('Общее время:', times.reduce((a, b) => a + b), 'ms');
    
    console.log('\nВывод');
    console.log('Время разное из-за:');
    console.log('1. Асинхронной природы bcrypt.hash()');
    console.log('2. Разной нагрузки на CPU в момент выполнения');
    console.log('3. Алгоритм bcrypt специально медленный для защиты от брутфорса');
    console.log('4. Случайная соль (salt) для каждого хеша');
}

hashPasswords().catch(console.error);
