var express = require('express');
var morgan = require('morgan');
var path = require('path');
var Pool = require('pg').Pool;
var crypto = require('crypto');
var bodyParser=require('body-parser');
var app = express();
var config={
    user:'vandanasv',
    database:'vandanasv',
    host:'db.imad.hasura-app.io',
    port:'5432',
    password:'db-vandanasv-94048'
    
};
var app = express();
app.use(morgan('combined'));
app.use(bodyParser.json());
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
function hash(input,salt){
    var hashed=crypto.pbkdf2Sync(input,salt,10000,512,'sha512');
    return ['pbkdf2','10000',salt,hashed.toString('hex')].join('$');
    
}

app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;
    var salt=crypto.randomBytes(128).toString('hex');
    var dbString=hash(password,salt);
    pool.query('INSERT INTO "user" (username,password) VALUES ($1,$2)',[username,dbString],function (err, result){
        if (err) {
          res.status(500).send(err.toString());
        } 
        else {
          res.send('Registration Successful'+username);
        } 
});
});

app.post('/create-user',function(req,res){
    var username=req.body.username;
    var password=req.body.password;

    pool.query('SELECT * from "user" username=$1)',[username],function (err, result){
        if (err) {
          res.status(500).send(err.toString());
        } 
        else {
            if(result.rows.length===0)
            {
                res.send(403).send('Invalid Username/Password');
            }
            else{
              var dbString = result.rows[0].password;
              var salt = dbString.split('$')[2];
              var hashedPassword = hash(password, salt);
              if (hashedPassword === dbString) {
                // Set the session
                req.session.auth = {userId: result.rows[0].id};
         
            res.send('credentials correct!');
                
              } else {
                res.status(403).send('username/password is invalid');
              }
          
        }    }
});  
});
app.get('/hash/:input', function (req, res) {
  var hashedString=hash(req.params.input,'This is some random string');
  res.send(hashedString);
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'ui', 'index.html'));
});


var pool = new Pool(config);
app.get('/test/test-db',function(req,res){
// make a select request
   // return a response with the results
   pool.query('SELECT * FROM test', function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          res.send(JSON.stringify(result.rows));
      }
   });
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



app.get('/article/:articleName', function (req, res) {
    pool.query("SELECT * FROM article where title=$1",[req.params.articleName], function (err, result) {
      if (err) {
          res.status(500).send(err.toString());
      } else {
          if(result.rows.length===0){
            res.status(404).send("ARTICLE NOT FOUND") ;
            }
            else{
                var articleData=result.rows[0];
                res.send(createTemplate(articleData));
            }
      }
   });
    
});

var port = 8080; // Use 8080 for local development because you might already have apache running on 80
app.listen(8080, function () {
  console.log(`IMAD course app listening on port ${port}!`);
});
