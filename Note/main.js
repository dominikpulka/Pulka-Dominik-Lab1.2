let addNoteBTN = document.querySelector('#addNoteBTN')
let storage = document.querySelector('#storage')
let pinNote = document.querySelector('#pinnedNote')
let Tab = []
addNoteBTN.addEventListener('click', addNote)
window.onload = function()
{
    if (localStorage.getItem('noteLS') !=null)
    {
        getfromLS()
        creatDiv()
    }
}
function addNote()
{
    let check
    if(pinNote.checked == true)
    {
        check = true
    }
    else
    {
        check = false
    }

    Tab.push(new Note(title.value, content.value, color.value, check))

    pushToLS()
    creatDiv()
}
function pushToLS()
{
    localStorage.setItem('noteLS', JSON.stringify(Tab));
    getfromLS();
}

function getfromLS()
{
Tab = JSON.parse(localStorage.getItem('noteLS'))
}

function creatDiv()
{
    storage.innerHTML = ''
    Tab.forEach(element =>{
        let newDiv = document.createElement('div')
        let title = document.createElement('div')
        title.innerText = element.title
        let content = document.createElement('div')
        content.innerText = element.content
        let time = document.createElement('div')
        time.innerText = element.currentdate
        newDiv.className = 'newDiv'
        newDiv.style.backgroundColor = element.color
        newDiv.appendChild(title)
        title.className = 'title'
        newDiv.appendChild(content)
        newDiv.appendChild(time)
        time.className = 'time'       
        if(element.pinned == false)
        {
            storage.appendChild(newDiv)
        }
        else
        {
            storage.prepend(newDiv)
        }
    })
}
