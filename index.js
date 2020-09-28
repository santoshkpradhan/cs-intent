
var express = require('express');
var router = express.Router();

const jsforce = require('jsforce');
var request = require('request');

const USERNAME = process.env.USERNAME;
const PASSWORD = process.env.PASSWORD;
const LOGINURL = process.env.LOGINURL;
const INTENTURL = process.env.INTENTURL;

const conn = new jsforce.Connection({
    loginUrl: LOGINURL
}
);

let accessToken;

conn.login(USERNAME, PASSWORD, function(err, userInfo) {
    if(err){
        return console.error(err);
    }
    console.log(conn);
    console.log(userInfo);
    accessToken = conn.accessToken;
});

// ROUTES
router.get('/', (req, res) => {
    console.log('listening');
});

router.post('/reset-token', (req, res) => {
    conn.login(USERNAME, PASSWORD, function(err, userInfo) {
        if(err){
            return console.error(err);
        }
        console.log(conn);
        console.log(userInfo);
        accessToken = conn.accessToken;
    });
});
router.post('/intent', (req, res) => {
    var options = {
        url: INTENTURL,
        headers: {
            'Authorization': 'Bearer '+conn.accessToken
        },
        body: req.body.text
    }
    request.post(options, function(error, response, body) {
        console.log(body);
        res.send(body);
    });
});

module.exports = router;