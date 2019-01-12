var canvas = document.querySelector('canvas');
canvas.height = window.innerHeight;
canvas.width = window.innerWidth;


var MAX_LEFT = Math.floor((20/100) * canvas.width);
var MAX_RIGHT = canvas.width - MAX_LEFT;
var MAX_TOP = Math.floor((40/100)*canvas.height); 
var c = canvas.getContext('2d');
var middlepositionX = canvas.width/2;
var middlepositionY = canvas.height;
var ParticleArray = [];
var ParticleArraySize = [9,10,11,12];
var colorarray = ["#F08900","#A0A5CD","#EA8A8C","#B3CA56","#494949","#A9C9BC"]; 
var initialstate = true;
var mouse = {
    x:middlepositionX,
    y:MAX_TOP
}



function Particles(startx,starty,endx,endy,radius,speed,color){
    
    this.startx = startx;
    this.starty = starty;
    this.endx = endx;
    this.endy = endy;
    this.radius = radius;
    this.speed = speed;
    this.dx = this.endx - this.startx;
    this.dy = this.endy - this.starty;
    this.x = this.startx;
    this.y = this.starty;
    this.color = color;
    this.timer = 1.1;
    this.distance = function(){
        var k = this.dx*this.dx + this.dy*this.dy;
        return Math.sqrt(k);
    }
    
    this.moves = this.distance()/this.speed;
    var xunits = this.dx/this.moves;
    var yunits = this.dy/this.moves;
    
    this.draw = function(){        
        c.fillStyle = color;
        c.beginPath();
        c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fill();
    }
    
     this.update = function(j){
            
             this.draw();
        
             this.x +=xunits;
             this.y +=yunits;
             this.timer-=0.01;
             if(this.x+this.radius > canvas.width || this.x-this.radius<0){
            xunits = -xunits;
            }
            if(this.y+this.radius > canvas.height || this.y-this.radius<0){
                yunits = -yunits;
            }
             if(this.timer<0)
                {
                    return true;
                }
          else return false;
         }
}



function Fireworks(endx,endy,radius){
    this.startX = middlepositionX;
    this.startY = middlepositionY;
    this.endX = endx;
    this.endY = endy;
    this.speed = 5;
    this.radius = radius; 
    this.dx = this.endX - this.startX;
    this.dy = this.endY - this.startY;
    this.x = this.startX;
    this.y = this.startY;
    this.distance = function(){
        var k = this.dx*this.dx + this.dy*this.dy;
        return Math.sqrt(k);
    }
    
    this.moves = this.distance()/this.speed;
    var xunits = this.dx/this.moves;
    var yunits = this.dy/this.moves;
    
    this.draw = function(){        
        // c.fillStyle = "#ffffff";
        c.fillStyle = "#6cecdb";
        c.beginPath(); c.arc(this.x,this.y,this.radius,0,Math.PI*2,false);
        c.fill();
    }
    this.update = function(i){
        this.draw();
        
             this.x +=xunits;
             this.y +=yunits;
         
        
        if(this.x<MAX_LEFT || this.x > MAX_RIGHT || this.y < MAX_TOP)
            {
                
                cannonballs.splice(i,1);
                var size = ParticleArraySize[Math.floor(Math.random()*ParticleArraySize.length)];
                for(var k = 0 ; k<size; k++)
                    { var speed = 2;
//                    var kx = Math.random()*innerWidth;
//                    var ky = 
//                    Math.random()*innerHeight;
                     var theta = 2*Math.PI*Math.random();
                    var color = colorarray[Math.floor(Math.random()*colorarray.length)];    
                    
                     if(k%5==0)
                        speed=0.5;
//                     if(k%2==0)
//                         {kx = -kx;
//                         ky = -ky;}
                    ParticleArray.push(new Particles(this.x,this.y,this.x+Math.cos(theta),this.y+Math.sin(theta),3,speed,color));
                    }
                
            }
    }

}
var cannonballs = [];

        var isMouseDown = false;
        var isTouchDown = false;
        window.addEventListener('mousemove',function(event){
            mouse.x = event.x;
            mouse.y = event.y;
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
		window.addEventListener("mousedown", function() {
			isMouseDown = true;	
		});
		
		window.addEventListener("mouseup", function() {
			isMouseDown = false;	
		});

        window.addEventListener("resize",function(){
            canvas.height = window.innerHeight;
            canvas.width = window.innerWidth;
            MAX_LEFT = Math.floor((20/100) * canvas.width);
            MAX_RIGHT = canvas.width - MAX_LEFT;
            MAX_TOP = Math.floor((40/100)*canvas.height);
            middlepositionX = canvas.width/2;
            middlepositionY = canvas.height;
        });
        
        

        

var timer = 1;

function animate()
{
    requestAnimationFrame(animate);
    if(isMouseDown===true || isTouchDown===true)
        {   timer++;
            if(timer%2==0){
            cannonballs.push(new Fireworks(mouse.x,mouse.y,5));}
        }
    c.fillStyle = "rgba(22,22,22,0.4)";
    c.fillRect(0,0,innerWidth,innerHeight);
    for(var i = 0 ; i <cannonballs.length ; i++)
        {   
           cannonballs[i].update(i);
            
        }
    if(ParticleArray.length!=0)
        {
            
            for(var j = 0; j<ParticleArray.length ;j++)
                {   
                    if(ParticleArray[j].update(j))
                        ParticleArray.splice(j,1);
                }
        }
    
}

function init()
{
    if(initialstate)
        {
            initialstate = false;
            for(var z = 0; z<16; z++)
              
                cannonballs.push(new Fireworks(mouse.x,mouse.y,5));
        }
      console.log(cannonballs);
}

init();

animate();