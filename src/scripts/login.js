
import { loginEndpoint, doExecuteFetch } from "./helpers/apis.mjs";
import { displayError } from "./helpers/setElementContent.mjs";



const loginForm = document.getElementById('loginForm');
const email = document.getElementById('email');
const password = document.getElementById('password');

const errorDisplay = document.getElementById('errorDisplay');



loginForm.addEventListener('submit', async(evt) => {

    evt.preventDefault();
    console.log('trying to login');


    const data = {
        'email': email.value.trim(),
        'password': password.value.trim()
    };

   
    try {

        // const loginPost = await fetch(loginEndpoint, {
        //     method: 'POST',
        //     body: JSON.stringify(data),
        //     headers: {
        //         'Content-type': 'application/json; charset=UTF-8',
        //     },
        // });

        // const loginData = await loginPost.json();

        const loginData = await doExecuteFetch(loginEndpoint, data);
        

        if(loginData.errors && loginData.errors.length) {
           
            // const combinedString = loginData.errors.reduce((accumulator, obj) => {
            //     return accumulator + " , " + obj.message;
            // }, "");

            // // Remove the leading space and , at start of a string using trim
            // const finalCombinedString = combinedString.trim().substring(2);
           
            // errorDisplay.innerHTML = finalCombinedString;

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

    











