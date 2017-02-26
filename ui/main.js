

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
            list+='@</li>'+comments[i]+'</li>';
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



/*//The Counter incrementing task
var button=document.getElementById("counter"); 
button.onclick=function(){
  //Creating a request object
    var request= new XMLHttpRequest();
  // Rendering content inside span tag
    request.onreadystatechange=function(){
        if(((request.readyState)===XMLHttpRequest.DONE)&&((request.status===200))){
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHTML=counter;
        }
    }
    //make a request to counter page
    request.open("GET","http://vandanasv.imad.hasura-app.io/counter",true);
    request.send(null);
};
*/

  



 
