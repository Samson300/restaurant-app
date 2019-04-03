// console.log("Looks like you have to be in the directory that has JS file to use Node");
const express = require('express');
const es6Renderer = require('express-es6-template-engine');

const app = express();
const http = require('http')
const hostname = '127.0.0.1';
const port = 3000;


const Restaurant = require('./models/restaurants');
const User = require('./models/user');

app.engine('html', es6Renderer);

app.set('view engine', 'html');

app.set('views', 'views');

app.get('/login', (req, res) => {
    res.render('login-form');
});


app.post('/login', (req, res) => {
    console.log(req.body);
})




const server = http.createServer(async (req, res) => {
    
    // console.log(req.url);
    console.log(req);
    
    res.statusCode = 200;
    
        // Declare the nature of the contents
    res.setHeader('Content-Type', 'application/json');

    if (req.url === "/restaurants") {
        const allResaturants = await Restaurant.getAll();
        const restaurantJson = JSON.stringify(allResaturants);
        res.end(restaurantJson);
    } else if (req.url.startsWith("/user")) {
        const parts = req.url.split("/");
        // console.log("===============================");
        // console.log(parts);
        // console.log("===============================");

        if (parts.length === 2) {
            const allUsers = await User.getAll();
            const UserJson = JSON.stringify(allUsers);
            res.end(UserJson);
        } else if (parts.length === 3) {
            const userId = parts[2];
            const theUser = await User.getById(userId);
            const userJSON = JSON.stringify(theUser);
            res.end(userJSON);
        } else {
            res.statusCode = 404;
            res.end("Resource not found.");
        }

        
    } else {
        res.end(`{
            message: "Thank you for your patronage."
        }`)
    }



        // Ship it
    // res.end(restaurantJson);
    
    
});
    
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});


