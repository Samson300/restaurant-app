const db = require('./conn');

class Reviews {
    // static getAll() {
    //     return db.any(`select * from reviews`);
    // }
    constructor(id, score, content, restaurant_id, user_id) {
        this.id = id;
        this.score = score;
        this.content = content;
        this.restaurant_id = restaurant_id;
        this.user_id = user_id;
    }

    static getByStars(score) {
        return db.any(`select * from reviews where score=${score}`)
    }
    static getById(theId) {
        return db.any(`select * from reviews where id=${theId}`)
            .then((reviewData) => {
                return new Reviews(
                    reviewData.id,
                    reviewData.score,
                    reviewData.content,
                    reviewData.restaurant_id,
                    reviewData.user_id
                )
            })
    }
    static getAll() {
        return db.any(`select * from reviews`)
            .then((arrayOfReviews) => {
                return arrayOfReviews.map((reviewData) => {
                    console.log("====================================")
                    console.log(reviewData);
                    console.log("====================================")
                    const aReview = new Reviews(
                        reviewData.id,
                        reviewData.score,
                        reviewData.content,
                        reviewData.restaurant_id,
                        reviewData.user_id
                    );
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                    console.log(aReview);
                    console.log("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~")
                    return aReview;
                });
            });
    }
}

module.exports = Reviews;