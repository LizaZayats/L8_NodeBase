require('dotenv').config({
    path: process.env.NODE_ENV === 'production' ? '.env.production' :
          process.env.NODE_ENV === 'domain' ? '.env.domain' : '.env.development'
});

console.log('Текущий режим работы');
console.log('NODE_ENV:', process.env.NODE_ENV || 'development');
console.log('MODE:', process.env.ACCESS_MODE);
console.log('PORT:', process.env.PORT);
console.log('DEBUG:', process.env.DEBUG);
console.log('HOST:', process.env.HOST || 'localhost');