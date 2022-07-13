import { get } from "./api.js";
import { navContorl } from "./navControl.js";

export function logout(){
   get('http://localhost:3030/users/logout');
    localStorage.clear();
    navContorl()
}