const http = require('http');
const fs = require("fs");

const server = http.createServer((req, res) => {

    
    fs.readFile('myfile.txt', 'utf8', (err, txtData) => {
        if (err) {
            res.writeHead(500, { "content-type": 'text/plain' });
            res.end("Sorry, couldn't read the file myfile.txt.");
        } else {
            
            fs.readFile('contactUs.html', (err, htmlData) => {
                if (err) {
                    res.writeHead(500, { "content-type": 'text/plain' });
                    res.end("Sorry, couldn't read the file contactUs.html.");
                } else {
                    
                    let modifiedHtml = htmlData.toString().replace('<!-- TXT_CONTENT -->', txtData);

                    
                    res.writeHead(200, { "content-type": "text/html" });
                    res.end(modifiedHtml);
                }
            });
        }
    });
});

const thePort = 3000;
const HOST = "127.0.0.1";

server.listen(thePort, HOST, () => {
    console.log(`The server is now running on port # ${thePort} and host ${HOST}`);
});
