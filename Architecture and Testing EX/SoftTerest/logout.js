import { get } from "./api.js";

export function logout(){
   get('http://localhost:3030/users/logout');
    localStorage.clear();
}