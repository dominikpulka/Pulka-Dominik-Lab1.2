class Note
{
    constructor(title, content, color, pinned)
    {
        this.title = title
        this.content = content
        this.color = color
        this.pinned = pinned
        let data = new Date()
        let date = data.toLocaleDateString()
        this.currentdate = ' ' + data
    }
    addToLS(note)
    {
        localStorage.setItem(localStorage, JSON.stringify(note));
    }
}