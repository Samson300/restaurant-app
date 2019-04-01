const db = require('./conn');

class Favorites {
    static getAll() {
        return db.any(`select * from favorites`);
    }
}

module.exports = Favorites;