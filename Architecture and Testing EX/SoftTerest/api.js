async function request(method,url,data){
    const options = {
        method,
        headers:{}
    }

    if(data != undefined){
        options.headers['Content-Type'] = 'application/json';
        options.body = JSON.stringify(data);
    }

    const user = JSON.parse(localStorage.getItem('user'));
    if(user){
        const token = user.accessToken;
        options['X-Authorization'] = token;
    }

    try{
        let response = await fetch(url,options);

        if(response.ok == false){
            if(response.status == 403){
                localStorage.removeItem('user');
            }
            let errData = await response.json();
            throw new Error(errData.message)
        }

        if(response.status == 204){
            return response;
        }else{
            return response.json();
        }

    }catch(err){
        alert(err.message);
        throw err;
    }
}

export const get = request.bind(null,'get');
export const post = request.bind(null,'post');
export const put = request.bind(null,'put');
export const del = request.bind(null,'delete');
