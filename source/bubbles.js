var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight; //set canvas height to full height
canvas.width = window.innerWidth; //set canvas width to full width

var c = canvas.getContext('2d');
//colorarray stores all the colors of the bubbles
var colorarray = ["#F08900","#A0A5CD","#EA8A8C","#B3CA56","#494949","#A9C9BC"]; 

//tracks cursor position
var mouse = {
    x: undefined,
    y:undefined
}
var maxradius = (canvas.width < 1000) ? 200 : 40 ; //maxradius of the bubbles

//CLASS FOR BUBBLES 
function Circle(x,y,dx,dy,radius)
{
    this.x = x;  //x position
    this.y = y;  //y position
    this.dx = dx; //x velocity
    this.dy = dy; //y velocity
    this.minradius = radius; 
    this.radius = radius; 
    this.color = window.colorarray[Math.floor(Math.random()*colorarray.length)];  //sets color value
    
    //function to draw the bubbles 
    this.draw = function(){
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fillStyle = this.color;
        c.fill();
    }
    
    //function to update the position of the bubbles
    this.update = function(){    
        // code to handle the movement of the bubbles
        if(this.x+this.radius > window.innerWidth || this.x-this.radius<0){
        this.dx = -this.dx;
        }
        if(this.y+this.radius > window.innerHeight || this.y-this.radius<0){
            this.dy = -this.dy;
        }
        this.x+=this.dx;
        this.y+=this.dy;  
        //////////////////////////////////////////////
        
        //code to handle the increase in bubble size on mouse hover
        if((mouse.x - this.x) < 80 && (mouse.x - this.x)> -80 && (mouse.y - this.y) < 80 && (mouse.y - this.y)> -80 && isTouchDown){
            if(this.radius<maxradius){
            this.radius +=2;}
        }
        else if(this.radius>this.minradius){
        this.radius -=2;   
        }
        ///////////////////////////////////////////////
       
        this.draw();
        }
}


var circlearray = [];  //array to store all the circle objects
var isTouchDown = true;
window.addEventListener('mousemove',function(event){

        
        mouse.x = event.x;
        mouse.y = event.y;
        isTouchDown = true;
})

window.addEventListener('touchstart',function(event){
            mouse.x = parseInt(event.changedTouches[0].clientX);
            mouse.y = parseInt(event.changedTouches[0].clientY);
            isTouchDown = true;
        })

        window.addEventListener('touchend',function(){
            isTouchDown = false;
        })

        window.addEventListener('touchmove',function(event){
            mouse.x = parseInt(event.changedTouches[0].clientX);
            mouse.y = parseInt(event.changedTouches[0].clientY);
            isTouchDown = true;
        })

window.addEventListener('resize',function(event){
    
    canvas.height = window.innerHeight;
    canvas.width = window.innerWidth;
    c.clearRect(0,0,window.innerWidth,window.innerHeight);
    init();
})

//function init initialises the circles
function init()

{   circlearray = [];
   
    if(canvas.width < 1000)
        {
            for(var i =0 ; i<500 ; i++)
            {
                var radius = Math.floor((Math.random()*10)+1);
                var x = (Math.random()*(innerWidth-2*radius))+radius;
                var y = (Math.random()*(innerHeight-2*radius))+radius;
                var dx = (Math.random()-0.5)*8;
                var dy = (Math.random()-0.5)*8;

                circlearray.push(new Circle(x,y,dx,dy,radius));
            } 
        }
 else
    {
        for(var i =0 ; i<1000 ; i++)
        {
            var radius = Math.floor((Math.random()*3)+1);
            var x = (Math.random()*(innerWidth-2*radius))+radius;
            var y = (Math.random()*(innerHeight-2*radius))+radius;
            var dx = (Math.random()-0.5)*8;
            var dy = (Math.random()-0.5)*8;

            circlearray.push(new Circle(x,y,dx,dy,radius));
        }
    
    }
}




function animate()
{
    requestAnimationFrame(animate);  
    c.clearRect(0,0,innerWidth,innerHeight);
    for(var i =0; i<circlearray.length; i++)
        {   
            circlearray[i].update();
        }

}

init();
animate();