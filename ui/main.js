console.log('Loaded!');
//Changing the value of mainText element
/*
var element=document.getElementById('mainText');
element.innerHTML="New value";
Move the image
var img=document.getElementById('madi');
var marginLeft=0;
function moveRight () {
    marginLeft=marginLeft+10;
    img.style.marginLeft=marginLeft+'px';
}
img.onClick=function () {
   var interval=setInterval(moveRight,100);
};*/
//Counter code
var button=document.getElementById('counter');
button.onClick=function (){
    counter=counter+1;
    var span=document.getElementById('count');
    span.innerHtml=counter.toString();
};