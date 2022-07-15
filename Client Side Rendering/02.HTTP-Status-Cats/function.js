export function showHidenInfo(e){
    e.preventDefault();
    let parent = e.target.parentNode;
    let div = parent.querySelector('div.status');
    if(e.target.textContent == 'Show status code'){
        e.target.textContent = 'Hide status code';
        div.style.display = 'block';
    }else{
        e.target.textContent = 'Show status code';
        div.style.display = 'none';
    }
};