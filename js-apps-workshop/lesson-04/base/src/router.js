import {catalogView} from './catalog.js'
import { createView } from './create.js'
import { loginView } from './login.js'
import { logoutView } from './logout.js'
import { registerView } from './register.js'

let library = {
    '/': catalogView,
    '/login':loginView,
    '/register': registerView,
    '/create': createView,
    '/logout': logoutView
}

export function router(path){
    let view = library[path];
    view()
}