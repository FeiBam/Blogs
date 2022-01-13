const TitleDom = document.getElementsByTagName('title')[0]

const setTitle = (Title) =>{
    TitleDom.innerHTML = Title
}


export {
    setTitle
}