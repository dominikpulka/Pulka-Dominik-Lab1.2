document.addEventListener('DOMContentLoaded', appStart)

let canvas
let ctx
let md = false
let mode = "kwadrat"
const color = pickedColor

function appStart(){
    canvas=document.querySelector('#area')
    document
        .querySelector('#darken')
        .addEventListener('click',()=> darkenFiltr())
    document
        .querySelector('#lighten')
        .addEventListener('click',()=> lightenFiltr())
    document
        .querySelector('#blur')
        .addEventListener('click',()=> blurFiltr())
    document
        .querySelector('#negative')
        .addEventListener('click', ()=> negativeFiltr())
    /*document
        .querySelector('#test')
        .addEventListener('click',()=> testFiltr())*/
    document
        .querySelector('#square')
        .addEventListener('click', ()=>{
            painting()
            paintingSquare()  
        })
    document
        .querySelector('#circle')
        .addEventListener('click', ()=>{
            painting()
            paintingCircle()
        })
    /*document
        .querySelector('#triangle')
        .addEventListener('click', ()=>{
            painting()
            paintingTriangle()
        })*/    
    document
        .querySelector('#black')
        .addEventListener('click', ()=> {
            black()
        })
    document
        .querySelector('#blue')
        .addEventListener('click', ()=> {
            blue()
        })
    document
        .querySelector('#red')
        .addEventListener('click', ()=> {
            red()
        })
    document
        .querySelector('#green')
        .addEventListener('click', ()=> {
            green()
        })        
    ctx = canvas.getContext('2d')
    drawImage() 
}
function drawImage(){
    const image = new Image()
    image.src = "Smerfy.jpg"
    image.addEventListener('load', () =>{
        ctx.drawImage(image, 0, 0)
    })
}
function darkenFiltr(amount = 30) {
    const canvasData = ctx.getImageData(0, 0, 800, 600)
    for (let i = 0; i < canvasData.data.length; i+=4){
        canvasData.data[i] -= amount
        canvasData.data[i+1] -= amount
        canvasData.data[i+2] -= amount
        //canvasData.data[i+3] -= amount
    }
    ctx.putImageData(canvasData, 0, 0)
}
function lightenFiltr(amount = 30){
    const canvasData = ctx.getImageData(0, 0, 800, 600)
    for(let i = 0; i < canvasData.data.length; i+=4){
        canvasData.data[i] += amount/2
        canvasData.data[i+1] += amount/2
        canvasData.data[i+2] += amount/2
    }
    ctx.putImageData(canvasData, 0, 0)
}
function blurFiltr(amount = 30){
    const canvasData = ctx.getImageData(0, 0, 800, 600)
    for(let i = 0; i < canvasData.data.length; i+=4){
        canvasData.data[i] = (canvasData.data[i] + canvasData.data[i+4])/2
        canvasData.data[i+1] = (canvasData.data[i+1] + canvasData.data[i+5])/2
        canvasData.data[i+2] = (canvasData.data[i+2] + canvasData.data[i+6])/2
    }
    ctx.putImageData(canvasData, 0, 0)
}
function negativeFiltr(amount = 30){
    const canvasData = ctx.getImageData(0, 0, 800, 600)
    for(let i = 0; i < canvasData.data.length; i+=4){
        for(let j = i; j < i+3; j++){
            canvasData.data[j] = 255 - canvasData.data[j]          
        }
    }
    ctx.putImageData(canvasData, 0, 0)
}
//Funkcja testowa 
/*function testFiltr(amount = 30){
    const canvasData = ctx.getImageData(0, 0, 800, 600)
    for(let i = 0; i < canvasData.data.length; i+=4){
        for(let j = i; j < i+3; j++){
            canvasData.data[j] = 255 - canvasData.data[j]          
        }
    }
    ctx.putImageData(canvasData, 0, 0)
}*/
function painting(){
    canvas.addEventListener('mousedown', down)
    canvas.addEventListener('mouseup', up)
    canvas.addEventListener('mousemove',
    function(e){
        let pos = getMousePos(canvas, e)
        let x = pos.x
        let y = pos.y
        let mode = "circle"
        draw(canvas, x, y, mode)
    })
   
    function down(){
        md = true
    }
    function up(){
        md = false
    }
    function getMousePos(canvas, e){
        var rect = canvas.getBoundingClientRect()
        return{
            x:e.clientX - rect.left,
            y:e.clientY - rect.top
        }
    }
    function draw(canvas, x, y){
        let ctx = canvas.getContext('2d')
        
        if(md){
            if (mode == "circle"){
                ctx.beginPath()
                ctx.arc(x, y, 15, 0, 2 * Math.PI)
                ctx.fill()
                ctx.fillStyle = pickedColor                
            }
            else if (mode== "square"){
                ctx.fillRect(x, y, 15, 15)
                ctx.fillStyle = pickedColor
            }
        }
    }
}
function paintingCircle()
{
    mode = "circle"
}
function paintingSquare()
{
    mode = "square"
}
/*function paintingTriangle(){
    mode = "triangle"
}*/
function black(){
    pickedColor = 'black'
}
function blue(){
    pickedColor = 'blue'
}
function red(){
    pickedColor = 'red'
}
function green(){
    pickedColor = 'green'
}
