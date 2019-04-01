// Bring in the database connection.
const db = require('./conn');

const Review = require('./reviews')

const bcrypt = require('bcryptjs');


// Need a User ..... object? Thing? Something?
class User {

    constructor(id, first_name, last_name, email, password) {
        this.id = id;
        this.firstName = first_name;
        this.lastName = last_name;
        this.email = email;
        this.password = password;
    }

    static getAll() {
        return db.any(`select * from users`);
    }

    static getById(id) {
        return db.one(`select * from users where id=${id}`)
                .then((userData) => {
                    const userInstance = new User(userData.id, userData.first_name, userData.last_name, userData.email, userData.password);
                    return userInstance;
                })
                .catch(() => {
                    return null;
                })
    }

    save() {
        return db.result(`update users set first_name='${this.firstName}', last_name='${this.lastName}', email='${this.email}', password='${this.password}' where id=${this.id}`)
    }

    setPassword(newPassword) {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(newPassword, salt);
        this.password = hash;
    }
    checkPassword(aPassword) {
        return bcrypt.compareSync(aPassword, this.password);

    }

    getReviews() {
        return db.any(`select * from reviews where user_id=${this.id}`)
            .then((arrayOfReviewData) => {
                const arrayOfReviewInstances = [];

                arrayOfReviewData.forEach((data) => {
                    const newInstance = new Review(
                        data.id,
                        data.score,
                        data.content,
                        data.restaurant_id,
                        data.user_id
                    )
                    arrayOfReviewInstances.push(newInstance);
                });

                return arrayOfReviewInstances;
            });
    }
}

// User.getById(3)
//     .then((user) => {
//         console.log(user);
//     });
// export my User model
module.exports = User;


