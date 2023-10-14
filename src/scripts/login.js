import { loginEndpoint, doExecuteFetch } from "./helpers/apis.mjs";
import { displayError } from "./helpers/setElementContent.mjs";

const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');
const errorDisplay = document.getElementById('errorDisplay');

loginForm.addEventListener('submit', async(evt) => {
    evt.preventDefault();

    const data = {
        'email': email.value.trim(),
        'password': password.value.trim()
    };
   
    try {
        const loginData = await doExecuteFetch(loginEndpoint, data);
        if(loginData.errors && loginData.errors.length) {
            displayError(loginData, errorDisplay);
        } else {
            loginData.profileName = loginData.name;
            delete loginData.name;
            localStorage.setItem('user', JSON.stringify(loginData));
            window.location.href = "/feed";
        }
    } catch(error) {
        console.log(error);
    }
});

    











