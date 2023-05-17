const Pool = require('pg').Pool;


const pool = new Pool({
    user : 'postgres',
    password : 'spider7687072',
    host : 'localhost',
    database : 'book',
    port : 5432,

});
module.exports = pool;
