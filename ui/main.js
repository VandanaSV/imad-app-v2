console.log('Loaded!');
//Changing the value of mainText element
var element=document.getElementById('mainText');
element.innerHTML="New value";
//Move the image
var img=document.getElementById('madi');
img.onClick=function(){
    img.style.marginLeft='100px';
    
};