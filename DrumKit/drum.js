document.body.addEventListener('keypress', onKeyPress)
document.querySelector('#ch1Rec').addEventListener('click', ch1rec)
document.querySelector('#ch2Rec').addEventListener('click', ch2rec)
document.querySelector('#ch3Rec').addEventListener('click', ch3rec)
document.querySelector('#ch4Rec').addEventListener('click', ch4rec)
document.querySelector('#ch1Play').addEventListener('click', ch1play)
document.querySelector('#ch2Play').addEventListener('click', ch2play)
document.querySelector('#ch3Play').addEventListener('click', ch3play)
document.querySelector('#ch4Play').addEventListener('click', ch4play)

let ch1Rec
let ch2Rec
let ch3Rec
let ch4Rec

const ch1 = []
const ch2 = []
const ch3 = []
const ch4 = []

let onChannel = 0

const sounds = {
    KeyQ: '#boom',
    KeyW: '#clap',
    KeyE: '#hihat',
    KeyR: '#kick',
    KeyA: '#snare',
    KeyS: '#tink',
    KeyD: '#openhat',
    KeyF: '#ride',
}



function ch1rec(){
    ch1Rec = Date.now()
    onChannel = 0
}

function ch2rec(){
    ch2Rec = Date.now()
    onChannel = 1
}

function ch3rec(){
    ch3Rec = Date.now()
    onChannel = 2
}

function ch4rec(){
    ch4Rec = Date.now()
    onChannel = 3
}

function ch1play() {
    ch1.forEach((el) =>{
        setTimeout(() => {
            playSound(sounds[el.sound])
        }, el.time)
    })
}
function ch2play() {
    ch2.forEach((el) =>{
        setTimeout(() => {
            playSound(sounds[el.sound])
        }, el.time)
    })
}
function ch3play() {
    ch3.forEach((el) =>{
        setTimeout(() => {
            playSound(sounds[el.sound])
        }, el.time)
    })
}
function ch4play() {
    ch4.forEach((el) =>{
        setTimeout(() => {
            playSound(sounds[el.sound])
        }, el.time)
    })
}
function onKeyPress(e){
    playSound(sounds[e.code])
    if (onChannel == 0){
        const time = Date.now() - ch1Rec
        const sound = {
            sound: e.code,
            time: time
        }   
        ch1.push(sound)
    }
    else if(onChannel == 1){
        const time = Date.now() - ch2Rec
        const sound = {
            sound: e.code,
            time: time
        }
        ch2.push(sound)
    }
    else if(onChannel == 2){
        const time = Date.now() - ch3Rec
        const sound = {
            sound: e.code,
            time: time
        }
        ch3.push(sound)
    }
    else if(onChannel == 3){
        const time = Date.now() - ch4Rec
        const sound = {
            sound: e.code,
            time: time
        }
        ch4.push(sound)
    }
}
function playSound(id){
    const audioTag = document.querySelector(id)
    audioTag.currentTime = 0
    audioTag.play()
}