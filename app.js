const http = require('http');
const url = require('url');
const fs = require('fs');

var messages = ["testing"];
var clients = [];

http.createServer(function(request, response) {

    var url_parts = url.parse(request.url);
    console.log("Full path name : " + url_parts.pathname);

    if (url_parts.pathname == '/') { // dealing with the homepage
        fs.readFile('./index.html', function (error, data) {
            response.end(data);
        });
    } else if (url_parts.pathname.substr(0, 5) == '/poll') {
        var count = url_parts.pathname.replace(/[^0-9]*/, '');
        console.log("Current count by the client (browser) : " + count);

        if (messages.length > count) {
            response.end(JSON.stringify({
                count: messages.length,
                append: messages.slice(count).join("\n") + "\n"
            }));
        } else {
            clients.push(response);
        }
    } else if (url_parts.pathname.substr(0, 5) == '/msg/') {
        const msg = decodeURI(url_parts.pathname.substr(5));
        messages.push(msg);

        while (clients.length > 0) {
            var client = clients.pop();
            client.end(JSON.stringify({
                count: messages.length,
                append: "\n"
            }));
            response.end();
        }
    }

}).listen(3000, 'localhost');
console.log('Server running');
console.log('------------------------------------');







/*
const express = require('express');
const app = express();

app.set('view engine', 'ejs');
app.use('/assets', express.static('assets'));

app.get('/', function(req, res) {
    res.render('index');
});

app.get('/contact', function(req, res) {
    res.render('contact', req.query);
});

app.get('/profile/:name', function(req, res) {
    const data = {age: 29, job: 'ninja', hobbies: ['eating', 'fighting', 'fishing', 'fucking']};
    res.render('profile', {person: req.params.name, data: data});
});

app.listen(3000);

*/