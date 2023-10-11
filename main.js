/*Canvas Variables*/
var canvas          = document.getElementById('can')
var ctx             = canvas.getContext('2d')
var width           = window.innerWidth
var height          = window.innerHeight
canvas.width        = width
canvas.height       = height

/*Ball Variables*/
var pos             = [100,height-100]
var vel             = [7,0]
var grav            = 0.5
var radius          = 60
var color           = '#47ffd4'
var colorGrd        = ctx.createRadialGradient(pos[0],height - pos[1], 5, 10, 10, 60);
colorGrd.addColorStop(0, '#47ffd4')
colorGrd.addColorStop(1, '#20fab9')

window.addEventListener('resize',onResizeHandler,false)

function onResizeHandler(e){
    width           = window.innerWidth
    height          = window.innerHeight
    canvas.width    = width
    canvas.height   = height
}

function updatePos(){
    pos[0] += vel[0]
    pos[1] += vel[1]
}

function updateVel(){
    vel[1] -= grav
}

function bounds(){
    if (pos[0] < radius){
        vel[0] = -vel[0]
        pos[0] = radius
    }
    else if (pos[0] + radius > width){
        vel[0] = -vel[0]
        pos[0] = width - radius
    }
    if (pos[1] < radius){
        vel[1] = -vel[1]
        pos[1] = radius
    }
    else if (pos[1] + radius > height){
        vel[1] = -vel[1]
        pos[1] = height - radius
    }
}

function draw(){
    ctx.beginPath()
    ctx.fillStyle = '#dedede'
    ctx.fillRect(0,0,width,height)
    ctx.closePath()
    ctx.beginPath()
    ctx.arc(pos[0],height-pos[1], radius, 0, Math.PI * 2)
    colorGrd = ctx.createRadialGradient(pos[0],height-pos[1], 5, pos[0],height-pos[1], 60)
    colorGrd.addColorStop(0, '#039aff')
    colorGrd.addColorStop(1, '#0381ff')
    ctx.fillStyle = colorGrd
    ctx.fill()
    ctx.closePath()
}

function update(){
    updateVel()
    updatePos()
    bounds()
    draw()
    animationID = requestAnimationFrame(update)
}

update()