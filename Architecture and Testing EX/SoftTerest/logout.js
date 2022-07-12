import { get } from "./api";

export function logout(){
    get('http://localhost:3030/users/logout');
    localStorage.clear();
}