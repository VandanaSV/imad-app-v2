var express = require('express');
var morgan = require('morgan');
var path = require('path');

var app = express();
app.use(morgan('combined'));


var content={
    title:'ARTICLE-ONE | THE FOUNTAIN HEAD',
    heading:'THE FOUNTAIN HEAD: AYN RAND',
    date:'February 5,2017',
    content:` <p>
                When it was first published in 1943,The fountainhead containing Ayn Rand's daringly original literary vision  with the seeds of her ground breakingphilosophy,Objectivism -won immediate worldwide acclaim.This instant classic is the story of an intransigent young architect,his violent battle against conventional standards and his explosie love affair with a beautiful woman who struggles to defeat him.
            </p>
            <p>
                The newyork times described the book and its autother as " A writer of great power.She hs a subtle and ingenious mind and the capacity of writing brilliantly,beautifully,bitterly...This is the only novel of ideas written by an American woman that I can recall.".
            </p>`
};

function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate=`
    <html>
    <head>
        <title>${title}</title>
        <meta name="viewport" content="width-device-width,initial-scale-1"/>
       <link href="/ui/style.css" rel="stylesheet" />
    </head>
    <body>
        <div class="container">
        <div>
            <a href='/'>HOME</a>
        </div>
        <hr/>
        <h3>
            ${heading}
        </h3>
        <div>
            ${date}
        </div>
        <div>
            ${content}
        </div>
        </div>
    </body>
    </html>
    `;
    return htmlTemplate;
}

app.get('/', function (req, res) {
  res.send(createTemplate(articleOne))
});


app.get('/article-one', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-one.html'));
});

app.get('/article-two', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-two.html'));
});

app.get('/article-three', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'article-three.html'));
});

app.get('/ui/style.css', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/madi.png', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});


var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
