const express =   require('express');
const fs =        require('fs');
var path =        require('path');
const app =       express();

app.use((req, res, next) => {
    var data =
        req.get('user-agent').replace(',', '') + ',' +
        (new Date()).toISOString() +             ',' +
        req.method +                             ',' +
        req.url +                                ',' +
        'HTTP/' + req.httpVersion +              ',' +
        res.statusCode +                         '\n';

    fs.appendFile('log.csv', data, (err) => {
        if (err) throw err;
        console.log(data);
        next();
    });
});

app.get('/', (req, res) => {
    // write your code to respond "ok" here
    res.send('ok');
});

app.get('/logs', (req, res) => {
    //read csv
    var filePath = path.join(__dirname, '../log.csv');
    var f = fs.readFile(filePath, 'utf8', function (err, data) {
        if (err) console.log(err);
        var arrLines = data.split('\n');
        var arrObjects = [];
        arrLines.forEach(function(line){
            var arrFields = line.split(',');
            var agent =     arrFields[0]; 
            var time =      arrFields[1];
            var method =    arrFields[2];
            var resource =  arrFields[3];
            var version =   arrFields[4];
            var status =    arrFields[5];
            arrObjects.push(
                {
                    Agent:    agent,
                    Time:     time,
                    Method:   method,
                    Resource: resource,
                    Version:  version,
                    Status:   status
                }
            );
        });
        res.json(arrObjects);
    });
})
module.exports = app;




//reach for the new file and grab everything
