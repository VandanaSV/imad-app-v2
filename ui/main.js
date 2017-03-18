

//LOGIN FUNCTIONALITY
var loginButton=document.getElementById('submit-login-button');
loginButton.onclick=function(){
    request.onreadystatechange=function(){
         var request= new XMLHttpRequest();
        if(((request.readyState)===XMLHttpRequest.DONE)&&((request.status===200))){
            console.log('user logged in');
            alert('Logged In !!!!');
            }
            else if(request.status===403)
               {
                   alert('Invalid Credentials');
               }
               else if(request.status===500)
               {
                   alert('Server crashed');
               }

    };
   var username=document.getElementById('username').value;
   var password=document.getElementById('password').value;
   console.log(username);
   console.log(password);
   request.open("POST","http://vandanasv.imad.hasura-app.io/login",true);
   request.setRequestHeader('Content-Type','application/json');
   request.send(JSON.stringify({username:username,password:password}));
};

var downloadButton=document.getElementById('downloadButton');
downloadButton.onclick=function(){
    var downloadUrl = "https://drive.google.com/file/d/0B9T6oE4VgbewQ2daTHdTb19VYUk/view?usp=drive_web";
    window.location=downloadUrl;
};



//Submit name javascript
var commentButton=document.getElementById('comment-submit');
commentButton.onclick=function(){
    
    //Creating a request object
    var request= new XMLHttpRequest();
  // Rendering content inside span tag
    request.onreadystatechange=function(){
        if(((request.readyState)===XMLHttpRequest.DONE)&&((request.status===200))){
         var comments=request.responseText;
         comments=JSON.parse(comments);
         var list='';
         for(var i=0; i<comments.length;i++)
            {
            list+='@</li>'+comments[i]+'</li><br>';
            //window.alert(names[i]);
            }
            var ol=document.getElementById('commentslist');
            ol.innerHTML=list;   
            }
    };

var comments=document.getElementById('Comments');
var commentValue=comments.value;
request.open("GET","http://vandanasv.imad.hasura-app.io/submit-name?comment="+ commentValue,true);
request.send(null);
};




  



 
