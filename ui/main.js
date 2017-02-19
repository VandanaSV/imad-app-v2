console.log('Loaded!');
//Changing the value of mainText element
var element=document.getElementById('mainText');
element.innerHTML="New value";
//Move the image
var img=document.getElementById('madi');
function moveRight(){
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}
img.onClick=function(){
   var interval=setInterval(moveRight,100);
};