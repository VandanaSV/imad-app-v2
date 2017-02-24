var button=document.getElementById('counter'); 
var counter=0;
button.onClick=function (){

    counter=counter+1;
    var span=document.getElementByID('count');
    span.innerHTML=counter.toString();
    
    
};





    //make a request to counter endpont
    
    //capture the response and store in a variable
    
    
    //render the variable in the correct span

//console.log('Loaded!');

//Counter code
//var button=document.getElementById('counter');

/* button.onClick=function (){
    var request= new XMLHttpRequest();
    request.onreadystatechange=function(){
        if((request.readyState)===XMLHttpRequest.DONE){
            if(request.status===200){
            var counter=request.responseText;
            var span=document.getElementById('count');
            span.innerHTML=counter.toString();
            }
        }
        };
        
    }; */
    

 
