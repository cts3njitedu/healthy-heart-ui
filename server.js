const express = require('express');
const path = require('path');
const request = require("request")
const app = express();
require('dotenv').config()

// Serve static files from the React app
app.use(express.static(path.join(__dirname, 'client/build')));

app.get('/api/*', (req, res) => {

    let newUrl = req.url.replace(/^(\/api)/, "");
    console.log(process.env.REACT_APP_HEALTHFUL_HEART_URL);
    const options = {
        url: process.env.REACT_APP_HEALTHFUL_HEART_URL + newUrl,
        method: 'GET',
        headers: req.headers

    }
    request(options, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('headers:', response.headers)
        
        res.json(JSON.parse(body))
    })

   
})

app.get('/login', (req, res) => {

    let newUrl = req.url.replace(/^(\/api)/, "");
    console.log(process.env.REACT_APP_HEALTHFUL_HEART_URL);
    const options = {
        url: process.env.REACT_APP_HEALTHFUL_HEART_URL + newUrl,
        method: 'GET',
        headers: req.headers

    }
    request(options, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        console.log('headers:', response.headers)
        
        res.json(JSON.parse(body))
    })

   
})


// The "catchall" handler: for any request that doesn't
// match one above, send back React's index.html file.
if (process.env.NODE_ENV === 'production') {
    // Serve any static files
    app.use(express.static(path.join(__dirname, 'client/build')));

    // Handle React routing, return all requests to React app
    app.get('*', function (req, res) {
        res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
    });
}

const port = process.env.PORT || 5000;
app.listen(port);

console.log(`Healthy heart app listerning on ${port}`);