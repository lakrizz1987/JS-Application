async function solution() {
    let main = document.getElementById('main');
    //TODO .....
    //{_id: 'ee9823ab-c3e8-4a14-b998-8c22ec246bd3', title: 'Scalable Vector Graphics'}
    //1: {_id: 'fdf00227-084f-48bc-a450-9242a0963f1f', title: 'Open standard'}
    //2: {_id: '8cd30492-3c55-4864-a1a2-7870e1694116', title: 'Unix'}
    //3: {_id: '9d776e93-bc6f-408c-9ab8-8aad7a5cffc4', title: 'ALGOL'}
    let response = await fetch('http://localhost:3030/jsonstore/advanced/articles/list');
    let data = await response.json();
    for (const el of data) {
        let divAccordion = create('div','',main);
        divAccordion.className = 'accordion';
    
        let divHead = create('div','',divAccordion);
        divHead.className = 'head';
    
        let span = create('span',`${el.title}`,divHead);
        let button = create('button','More',divHead);
        button.className = 'button';
        button.id = el._id;

        let divExtra = create('div','',divAccordion);
        divExtra.className = 'extra';

        button.addEventListener('click',showContent)
        //let p = create('p','',divExtra);

    }
   

}
//_id: 'ee9823ab-c3e8-4a14-b998-8c22ec246bd3', title: 'Scalable Vector Graphics', content: 'Scalable Vector Graphics (SVG) is an Extensible Ma…y the World Wide Web Consortium (W3C) since 1999.'}
async function showContent(e){
    let response = await fetch(`http://localhost:3030/jsonstore/advanced/articles/details/${e.target.id}`);
    let data = await response.json();
    let parent = e.target.parentNode.parentNode;
    let divContent = parent.querySelector("div.extra")
    

    if(e.target.textContent == 'More'){
        e.target.textContent = 'Less';
        let p = create('p',`${data.content}`,divContent);
        divContent.style.display = 'block'
    }else{
        e.target.textContent = 'More';
        divContent.style.display = 'none'
        divContent.innerHTML = '';
    }
}

function create(type,content,parent){
    let element = document.createElement(type);

    if(content){
        element.textContent = content;
    }

    if(parent){
        parent.appendChild(element);
    }

    return element;
}
solution()