const pgp = require('pg-promise')({
    query: e => {
        console.log('QUERY: ', e.query);
    }
});


const options = {
    host: 'localhost',
    database: 'restaurants-app'
};

const db = pgp(options);
module.exports = db;

// db.any('SELECT * from users where id=1', [true])
//     .then(function(data) {
//         // success;
//         console.log(data);
//     })
//     .catch(function(error) {
//         // error;
//     });