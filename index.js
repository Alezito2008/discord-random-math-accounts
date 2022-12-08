var app = require('express')();
var path = require('path');

const { createCanvas }  = require('canvas');
const fs = require('fs');

const canvasconfig = {
    width: 1200,
    height: 627
};

function createMath() {
    var num1 = Math.floor(Math.random() * 100);
    var num2 = Math.floor(Math.random() * 100);
    var num3 = Math.floor(Math.random() * 100);
    var num4 = Math.floor(Math.random() * 100);
    var op1 = Math.floor(Math.random() * 2);
    var op2 = Math.floor(Math.random() * 2);
    var op3 = Math.floor(Math.random() * 2);
    op1 === 0 ? op1= "+" : op1= "-";
    op2 === 0 ? op2= "+" : op2= "-";
    op3 === 0 ? op3= "+" : op3= "-";
    return `${num1} ${op1} ${num2} ${op2} ${num3} ${op3} ${num4}`;
}

app.get('/mathproblem', function (req, res)  {
    var options = {
        root: path.join(__dirname)
    };
    var canvas = createCanvas(canvasconfig.width, canvasconfig.height);
    var context = canvas.getContext('2d');

    context.fillStyle = 'black'
    context.fillRect(0, 0, canvasconfig.width, canvasconfig.height);

    context.font = "bold 70pt 'Arial'";
    context.textAlign = 'center';
    context.fillStyle = "#fff";

    context.fillText(createMath(), canvasconfig.width/2, canvasconfig.height/2);

    var buffer = canvas.toBuffer("image/png");
    fs.writeFileSync("./image.png", buffer);

    console.log(req.get('user-agent'));
    if (req.get('user-agent').includes('Macintosh; Intel Mac OS X 11.6;') || req.get('user-agent').includes('Discordbot/2.0;')) {
        res.sendFile('./image.png', options);
    }
    if (!req.get('user-agent').includes('Macintosh; Intel Mac OS X 11.6;') && !req.get('user-agent').includes('Discordbot/2.0;')) {
        res.redirect('https://github.com/Alezito2008');
    }
})

app.listen(3000, () => {
    console.log('Listening on port 3000');
})