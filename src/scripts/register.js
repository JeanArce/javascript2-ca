import { registerEndpoint, doExecuteFetch } from "./helpers/apis.mjs";
import { displayError } from "./helpers/setElementContent.mjs";

const registerForm = document.getElementById("registerForm");
const nameValue = document.getElementById("name");
const email = document.getElementById("email");
const password = document.getElementById("password");
const errorDisplay = document.getElementById('errorDisplay');
const successDisplay = document.getElementById('successDisplay');


registerForm.addEventListener('submit', async(e) => {
    e.preventDefault();

    const data = {
        'name': nameValue.value.trim(),
        'email': email.value.trim(),
        'password': password.value.trim()
    };

    try {
        const registerData = await doExecuteFetch(registerEndpoint, data);
        if(registerData.errors && registerData.errors.length) {
            displayError(registerData, errorDisplay, successDisplay);
        } else {
            errorDisplay.innerHTML = ''; 
            successDisplay.innerHTML = `You are successfully registered! Please <a href="/index.html">Login</a>`; 
            registerForm.reset();
        }
    } catch(error) {
        console.log(error);
    }
});