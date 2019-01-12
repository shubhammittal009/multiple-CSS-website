var canvas = document.querySelector('canvas')

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var ctx = canvas.getContext('2d')

var colorarray = ['#581845', '#900C3F', '#C70039', '#FF5733', '#FFC30F']

function particles(x,y,dx,dy,radius){
    this.x = mouse.x;
    this.y = mouse.y;
    this.dx = dx;
    this.dy = dy;
    this.radius = radius;
    this.color = window.colorarray[Math.floor(Math.random()*colorarray.length)]

    this.draw = function(){

        ctx.strokeStyle = this.color
        ctx.beginPath()
        ctx.arc(this.x,this.y,this.radius,0,2*Math.PI)
        ctx.stroke()
    }

    this.update = function(i){
        if(this.x+this.radius > window.innerWidth || this.x-this.radius<0){
            this.dx = -this.dx;
            }
        if(this.y+this.radius > window.innerHeight || this.y-this.radius<0){
                this.dy = -this.dy;
            }
        this.x+=this.dx;
        this.y+=this.dy;  
        this.radius-=Math.random();
        // if(this.radius <= 0){
        //     particle_array.splice(i,1);
        // }

        if(this.radius >= 0 ){
            this.draw();
        }
        else{
            particle_array.splice(i,1);
        }

    }
}
var particle_array = [];
// function init(){
//     for(let i=0; i<100; i++)
//     {   
//         var dx = Math.random()*0.5;
//         var dy = Math.random()*0.5;
//         particle_array.push(new particles(mouse.x,mouse.y,dx,dy,40))
//     }
// }

window.addEventListener('mousemove', function(event){
    mouse.x = event.clientX;
    mouse.y = event.clientY;
})

window.addEventListener('resize', function(){
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    mouse.x = window.innerWidth/2;
    mouse.y = window.innerHeight/2;
})

var mouse = {
    x: window.innerWidth/2,
    y: window.innerHeight/2
};



function animate(){

    requestAnimationFrame(animate)
    ctx.clearRect(0,0,window.innerWidth,window.innerHeight)
        var dx = (Math.random()-0.5) * 3.5;
        var dy = (Math.random()-0.5) * 3.5;
        particle_array.push(new particles(mouse.x,mouse.y,dx,dy,40))
    
    for(let i=0 ; i<particle_array.length; i++)
    {
        
        particle_array[i].update(i);
    }

}
//init()
animate()