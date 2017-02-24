//var button=document.getElementById('counter'); 
//button.onClick=function()
document.getElementById('counter').onClick=function(){
  //Creating a request object
    var request= new XMLHttpRequest();
  // 
    request.onreadystatechange=function(){
        if(((request.readyState)===XMLHttpRequest.DONE)&&((request.status===200))){
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHTML=counter.toString();
        }
    }
  //make a request  
    request.open("GET","http://vandanasv.imad.hasura-app.io/counter",true);
    request.send(null);
        

};





  



 
