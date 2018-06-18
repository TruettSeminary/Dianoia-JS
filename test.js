require('babel-core/register');
require('babel-polyfill'); 

const Dianoia = require('./dist');
const api = new Dianoia.Dianoia({
    baseURL: 'http://localhost:1337'
});

const email = 'Barth'; 
const password = 'barth'; 

async function login() {
    return await api.loginUser(email, password); 
}

async function me() {
    return await api.getUser(); 
}

async function register() {
    return await api.registerUser('dev+kelsey@austinbratcher.com', 'bratcher', 'kelsey', 'bratcher'); 
}

async function updateUser(user_id) {
    return await api.updateUser(user_id, {
        first_name: 'Kels'
    });
}

async function addClass(user, class_id) {
    return await api.addClassToUser(user, class_id); 
}

async function getAllClasses() {
    return await api.getAllClasses(); 
}

async function getAllCards() {
    return await api.getAllCards(); 
}

async function test() {
    const response = await login(); 
    api.setJWT(response.jwt); 
    // const user = await me(); 
    // console.log(user);
    const cards = await getAllCards(); 
    console.log(cards); 

    // const res2 = await addClass(user,"5af0e1eb9bd37604420c2156"); 
    // console.log(res2); 

    // const response = await register(); 
    // console.log(response); 


}

test(); 

// try {
//     const user = api.loginUser(email, password); 
//     user.then(res => console.log(res));
//     // console.log(user); 
// }
// catch(err) {
//     console.error(err); 
// }