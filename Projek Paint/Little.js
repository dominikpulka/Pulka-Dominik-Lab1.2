document.addEventListener('DOMContentLoaded', appStart)

let canvas;
let ctx;
let movedown = fales;
let more = "square";
const color = drawcolor;

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
/*function testFiltr(amount = 30){
    const canvasData = ctx.getImageData(0, 0, 800, 600)
    for(let i = 0; i < canvasData.data.length; i+=4){
        for(let j = i; j < i+3; j++){
            canvasData.data[j] = 255 - canvasData.data[j]          
        }
    }
    ctx.putImageData(canvasData, 0, 0)
}*/
