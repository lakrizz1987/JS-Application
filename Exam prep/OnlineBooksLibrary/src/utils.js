export function isLoged(){
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
        return true
    }else{
        return false
    }
};