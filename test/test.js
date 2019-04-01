
// const assert = require('assert');
const chai = require('chai');
const expect = chai.expect;
const chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised).should();
const User = require('../models/user');
const Restaurant = require('../models/restaurants');
const Reviews = require('../models/reviews');
const Favorites = require('../models/favorites');

describe('Restaurant model', () => {
    it('should be able to grab an array of restaurants', async () => {
        const arrayOfRestaurants = await Restaurant.getAll();
        expect(arrayOfRestaurants).to.be.instanceOf(Array);
    })
    
    it('should be able to grab chilis and golden corral from restaurants', async () => {
        const arrayOfRestaurants = await Restaurant.getByName('c');
        expect(arrayOfRestaurants).to.be.instanceOf(Array);
    })
})

describe('Reviews model', () => {
    it('should be able to grab an array of reviews', async () => {
        const arrayOfReviews = await Reviews.getAll();
        expect(arrayOfReviews).to.be.instanceOf(Array);
    })

    it('should be able to grab five star reviews', async () => {
        const arrayOfReviews = await Reviews.getByStars(5);
        expect(arrayOfReviews).to.be.instanceOf(Array);
    })

    it(`should be able to retrieve a review by id`, async () => {
        const thatReview = await Reviews.getById(2);
        expect(thatReview).to.be.an.instanceOf(Reviews);
    })
        it(`should be able to retrieve all review`, async () => {
        const aBunchOfReviews = await Reviews.getAll();
        expect(aBunchOfReviews).to.be.an.instanceOf(Array);
        for (let i=0; i<aBunchOfReviews[i].length;i++) {
            expect(aBunchOfReviews[i]).to.be.an.instanceOf(Reviews);
        }
    })

    // it(`should be able to retrieve a review by user`, async () => {
        
    // })
})

describe('Favorites model', () => {
    it('should be able to grab an array of favorites', async () => {
        const arrayOfFavorites = await Favorites.getAll();
        expect(arrayOfFavorites).to.be.instanceOf(Array);
    })
})

// describe('Sanity check', function () {
//     it('should be 2', function () {
//         // assert.equal(2, 1 +1);
//         expect(1 + 1).to.equal(2);
//     });
// });

describe('Users model', () => {
    it('should be able to retreive by id', async () => {
        const theUser = await User.getById(3);
        theUser.should.be.an.instanceOf(User);
        // theUser.should.have.length(1);
    });


    it('should error if no user by id', async () => {
        const theUser = await User.getById(276345);
        expect(theUser).to.be.null;
        // theUser.should.be.an.instanceOf(User);
     // theUser.should.have.length(1);
    })

    it('should update the user', async () => {
        const theUser = await User.getById(2);
        theUser.email = "new@new.com";
        theUser.save()
            .then(async(report) => {
                const alsoTheUser = await User.getById(2);
                expect(alsoTheUser.email).to.equal('new@new.com');
            })
    });

    it(`should encrypt the password`, async () => {
        const password = 'bacon';
        const theUser = await User.getById(1);
        theUser.setPassword("bacon");
        expect(theUser.password).not.to.equal("bacon");
    })

    it('should be able to check for correct passwords', async () => {
        const theUser = await User.getById(1);
        theUser.setPassword("bacon");
        
        await theUser.save();

        const sameUser = await User.getById(1);

        const isCorrectPassword = sameUser.checkPassword("bacon");
        expect(isCorrectPassword).to.be.true;

        const isNotCorrectPassword = sameUser.checkPassword("tofu");
        expect(isNotCorrectPassword).to.be.false;
    })
});

describe('Users and reviews', () => {
    it('a user instance should be able to retrieve all their reviews', async () => {
        const theUser = await User.getById(3);
        const theReviews = await theUser.getReviews();
        expect(theReviews).to.be.an.instanceOf(Array);
        expect(theReviews).to.have.lengthOf(1);
        for (let i=0; i<theReviews.length; i++) {
            expect(theReviews[i]).to.be.an.instanceOf(Reviews);
        }
    })
});




