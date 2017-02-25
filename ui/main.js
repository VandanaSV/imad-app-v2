
//Submit name javascript

var submitButton=document.getElementById('submitButton');
submitButton.onclick=function(){
    
    //Creating a request object
    var request= new XMLHttpRequest();
  // Rendering content inside span tag
    request.onreadystatechange=function(){
        if(((request.readyState)===XMLHttpRequest.DONE)&&((request.status===200))){
         var names=request.responseText;
         names=JSON.parse(names);
         var list='';
         for(var i=0; i<names.length;i++)
            {
            list+='<li>'+names[i]+'</li>';
            //window.alert(names[i]);
            }
            var ol=document.getElementById('nameList');
            ol.innerHTML=list;   
            }
    };
var nameInput=document.getElementById('name');
var nameValue=nameInput.value;
request.open("GET","http://vandanasv.imad.hasura-app.io/submit-name?name="+ nameValue,true);
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

  



 
