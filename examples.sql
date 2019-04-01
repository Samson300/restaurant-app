-- USER PROFILE
-- 1. get all info for a user by id
    -- 1a. get only a few fields for a public version
        select id, first_name, last_name, email, from users;
    -- 1b. get all fields for private version
        select * from users where id=1;

-- 2. get all favorites from a user by id
    select u.id, f.user_id, r.name
    from users u
    inner join favorites f
    on u.id = f.user_id
    inner join restaurants r
    on r.id = f.restaruant_id
    where u.id=1;


-- 3. get all reviews written by that user by id
    select r.score, r.content, u.first_name || ' ' || u.last_name as name
    from users u
    inner join reviews r
    on u.id = r.user_id
    where u.id=1;



-- RESTAURANT PROFILE
-- 1. get all info for a restaurant by id

-- 2. get all reviews for restaurant by id
-- 3. get average review for a restaurant by id
-- 4. get count of favorites for restaurant by id



-- RESTAURANT SEARCH RESULT
-- 1. get all matching rows for restaurant by name(case insensitive serch)
    -- 1a. include average review
    -- 1b. indlude number of favorites
-- 2. limit by minimum review
-- 3. (super bonus) pagination

const db = require('./conn');

db.any('SELECT * from users where id=1', [true])
    .then(function(data) {
        // success;
        console.log(data);
    })
    .catch(function(error) {
        // error;
    });