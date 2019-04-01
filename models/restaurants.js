const db = require('./conn');

class Restaurant {
    static getAll() {
        return db.any(`select * from restaurants`);
    }
    static getByName(letter) {
        return db.any(`select name from restaurants where name ilike '%${letter}%'`)
    }
}

module.exports = Restaurant;