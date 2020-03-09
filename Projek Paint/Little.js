document.addEventListener('DOMContentLoaded', appStart)

let canvas
let ctx
let md = false
let mode = "kwadrat"
const color = pickedColor

function appStart(){
    canvas=document.getElementById('area')
    document
        .getElementById('darken')
        .addEventListener('click',()=> darkenFiltr())
    document
        .getElementById('lighten')
        .addEventListener('click',()=> lightenFiltr())
    document
        .getElementById('blur')
        .addEventListener('click',()=> blurFiltr())
    document
        .getElementById('negative')
        .addEventListener('click', ()=> negativeFiltr())
    /*document
        .querySelector('#test')
        .addEventListener('click',()=> testFiltr())*/
    document
        .getElementById('square')
        .addEventListener('click', ()=>{
            painting()
            paintingSquare()  
        })
    document
        .getElementById('circle')
        .addEventListener('click', ()=>{
            painting()
            paintingCircle()
        })
    document
        .getElementById('rectangle')
        .addEventListener('click',() => {
            painting()
            paintingRectangle()
        })
    /*document
        .querySelector('#triangle')
        .addEventListener('click', ()=>{
            painting()
            paintingTriangle()
        })*/   
    document
        .getElementById('black')
        .addEventListener('click', ()=> {
            black()
        })
    document
        .getElementById('blue')
        .addEventListener('click', ()=> {
            blue()
        })
    document
        .getElementById('red')
        .addEventListener('click', ()=> {
            red()
        })
    document
        .getElementById('green')
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
                ctx.fillRect(x, y, 30, 30)
                ctx.fillStyle = pickedColor
            }
            else if (mode == "rectangle"){
                ctx.fillRect(x, y, 30, 15)
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
function paintingRectangle()
{
    mode = "rectangle"
}
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
