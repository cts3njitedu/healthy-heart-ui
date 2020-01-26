const express = require('express');
const path = require('path');
const request = require("request")
const app = express();
const CacheService = require('./cache-service')
require('dotenv').config()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser');
const moment = require("moment")
const cache = new CacheService(60*60)
// Serve static files from the React app
app.use(bodyParser.json());

app.use(cookieParser());

app.get('/api/*', (req, res) => {

    let newUrl = req.url.replace(/^(\/api)/, "");
    console.log(process.env.REACT_APP_HEALTHFUL_HEART_URL);
    console.log(req.headers);
  
    cache.get("refresh_token").then(function(value) {
        let refresh_token = null;
        if(value){
            refresh_token = "refresh_token="+value;
        }
        const options = {
            url: process.env.REACT_APP_HEALTHFUL_HEART_URL + newUrl,
            method: 'GET',
            headers: {
                'Content-Type': req.headers["content-type"],
                'Authorization': req.headers.authorization,
                'Cookie' : refresh_token || null 
            }
    
        }
        request(options, function (error, response, body) {
            console.log('headers:', response.headers)
            if (response.headers.token) {
                res.setHeader('token', response.headers.token);
            }
            res.status(response.statusCode).json(JSON.parse(body))
        })
        
    })
    

   
})

app.post('/api/*', (req, res) => {

    console.log("In post method")
    let newUrl = req.url.replace(/^(\/api)/, "");
    console.log(process.env.REACT_APP_HEALTHFUL_HEART_URL);
    console.log(req.body)
   

    const options = {
        url: process.env.REACT_APP_HEALTHFUL_HEART_URL + newUrl,
        method: 'POST',
        headers: {
            'Content-Type': req.headers["content-type"],
            'Authorization': req.headers.authorization
        },
        body: JSON.stringify(req.body)

    }

    request.post(options, function (error, response, body) {
        console.log('error:', error); // Print the error if one occurred
        console.log('statusCode:', response && response.statusCode); // Print the response status code if a response was received
        let cookies = response.headers['set-cookie']
        //Sat, 25 Jan 2020 17:15:21
        if (newUrl === "/login" || newUrl === "/signup") {
            let promises = [];
            cookies.forEach(cookie => {
                promises.push(new Promise(function(resolve) {
                    let splitCookie = cookie.split(";");
                    let token = splitCookie[0]
                    let key = token.substr(0, token.indexOf("="));
                    let value = token.substr(token.indexOf("=")+1);
                    cache.set(key,value).then(function(r){
                        console.log(r)
                        resolve()
                    });
                    
                }))
            })
            Promise.all(promises).then(function(){
                res.setHeader('token', response.headers.token);
                res.status(response.statusCode).json(JSON.parse(body))
            })
        } else {
            res.setHeader('token', response.headers.token);
            res.status(response.statusCode).json(JSON.parse(body))
        }
        
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