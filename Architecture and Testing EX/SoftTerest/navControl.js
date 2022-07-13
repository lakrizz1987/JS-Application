

export function navContorl(){
    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        document.querySelectorAll('.guest').forEach(e=>e.style.display = 'none');
        document.querySelectorAll('.user').forEach(e=>e.style.display = 'block');
    }else{
        document.querySelectorAll('.guest').forEach(e=>e.style.display = 'block');
        document.querySelectorAll('.user').forEach(e=>e.style.display = 'none');
    }
}