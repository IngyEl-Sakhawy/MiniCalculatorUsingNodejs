const http = require('http');
const filesystem = require('fs');
http.createServer((req, res) => {
    
    if (req.url !== '/favicon.ico') {
        
        var equation = req.url;
        var eqArray = equation.split('/');
        calculator(eqArray, res);
    }
    res.end();
}).listen(7000);

function calculator(eqArray, res) {
    
    var operator = eqArray[1];
    var sum = 0;

    if (operator === "add") {
        for (var i = 2; i < eqArray.length; i++) {
            sum += parseInt(eqArray[i]);
        }
    } else if (operator === "sub") {
        sum = parseInt(eqArray[2]);
        for (var i = 3; i < eqArray.length; i++) {
            sum -= parseInt(eqArray[i]);
        }
    } else if (operator === "mul") {
        sum = parseInt(eqArray[2]);
        for (var i = 3; i < eqArray.length; i++) {
            sum *= parseInt(eqArray[i]);
        }
    } else if (operator === "div") {
        sum = parseInt(eqArray[2]);
        for (var i = 3; i < eqArray.length; i++) {
            sum /= parseInt(eqArray[i]);
        }
    } else {
        res.writeHead(400, "Bad Request", { "Content-Type": "text/html" });
        res.end("<h1>Invalid Operator</h1>");
        return;
    }
    filesystem.appendFileSync('calData.txt',`${operator} result ${sum}\n`,()=>{});
    res.writeHead(200, "OK", { "Content-Type": "text/html" });
    res.write(`<h1>Welcome To My Calculator</h1>
                    <h1>Result: ${sum}</h1>`);
    
    
}
