var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var config={
    user:'vandanasv',
    database:'vandanasv',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:'db-vandanasv-94048'
    
}

var app = express();
app.use(morgan('combined'));

var articles={
    'article-one':{
        title:'ARTICLE-ONE | THE FOUNTAIN HEAD',
        heading:'THE FOUNTAIN HEAD: AYN RAND',
        date:'February 5,2017',
        content:` <p>
                When it was first published in 1943,The fountainhead containing Ayn Rand's daringly original literary vision  with the seeds of her ground breakingphilosophy,Objectivism -won immediate worldwide acclaim.This instant classic is the story of an intransigent young architect,his violent battle against conventional standards and his explosie love affair with a beautiful woman who struggles to defeat him.
            </p>
            <p>
                The newyork times described the book and its autother as " A writer of great power.She hs a subtle and ingenious mind and the capacity of writing brilliantly,beautifully,bitterly...This is the only novel of ideas written by an American woman that I can recall.".
            </p>`
    },
    'article-two':{
        title:'ARTICLE-TWO | ONE HUNDRED YEARS OF SOLITUDE',
        heading:'ONE HUNDRED YEARS OF SOLITUDE: GABRIEL GARCIA MARQUEZ',
        date:'February 10,2017',
        content:` <p>
              Pipes and kettledrums herald the arrival of gypsies on their annual visit to Mocondo,the newly founded village where Jose Arcadio Buendia and his father with new inventions and tales of adventure ,neither can know the significance of the indecipherirable manuscript that the old gypsies passes into therir hans.
            </p>
            <p>
              Through plagues of insomnia,civil war,hauntings and vendettas,the many tribulations of the Buendia house-hold push memories of the manuscript aside.Few remember its existance and only one will discover the hidden message that it holds.
            </p>`
    },
    'article-three':{
        title:'ARTICLE-THREE | THE CATCHER IN THE RYE',
        heading:'THE CATCHER IN THE RYE: J.D.SALINGER',
        date:'February 15,2017',
        content:` <p>
                The Catcher in the Rye is a 1951 novel by J. D. Salinger. A controversial novel originally published for adults, it has since become popular with adolescent readers for its themes of teenage angst and alienation.
            </p>
            <p>
                Jerome David Salinger was an American author, best known for his 1951 novel The Catcher in the Rye, as well as his reclusive nature. His last original published work was in 1965; he gave his last interview in 1980. Raised in Manhattan, Salinger began writing short stories while in secondary school, and published several stories in the early 1940s before serving in World War II.
            </p>`
    }
};

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});

function createTemplate(data)
{
    var title=data.title;
    var heading=data.heading;
    var date=data.date;
    var content=data.content;
    var htmlTemplate=`
    <html>
    <head>
        <title> ${title} </title>
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



var pool = new Pool(config);
app.get('/test-db',function(req,res){
//Make a select request
pool.query('SELECT * FROM test',function(err,result){
    if(err)
    {
        res.status(500).send(err.toString());
    }
    else{
        res.send(JASON.stringify(result.rows));
    }
});

//return response
});







var counter=0;
app.get('/counter', function (req, res) {
    counter=counter+1;
    res.send(counter.toString());
});

var names=[];
var comments=[];
app.get('/submit-name', function (req, res) {
    //Get the name from request
   
    var comment=req.query.comment;
    
    comments.push(comment);
    //JSON:Javascript Object Notation-To convert javasript objects into strings
   
    res.send(JSON.stringify(comments));
    
});



app.get('/ui/style.css', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'style.css'));
});

app.get('/ui/main.js', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'main.js'));
});

app.get('/ui/madi.png', function (req, res) {
    res.sendFile(path.join(__dirname, 'ui', 'madi.png'));
});



app.get('/:articleName', function (req, res) {
    var articleName=req.params.articleName;
    res.send(createTemplate(articles[articleName]));
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
