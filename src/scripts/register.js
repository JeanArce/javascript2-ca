//const storedUser = JSON.parse(localStorage.getItem('user'));


const baseUrl = 'https://api.noroff.dev/api/v1';
const registerEndpoint = baseUrl + '/auction/auth/register';


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
        const registerPost = await fetch(registerEndpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const registerData = await registerPost.json();

    
        if(registerData.errors && registerData.errors.length) {
           
            const combinedString = registerData.errors.reduce((accumulator, obj) => {
                return accumulator + " , " + obj.message;
            }, "");

            // Remove the leading space and , at start of a string using trim
            const finalCombinedString = combinedString.trim().substring(2);
           
            errorDisplay.innerHTML = finalCombinedString;
            successDisplay.innerHTML = '';

        } else {
            errorDisplay.innerHTML = ''; 
            successDisplay.innerHTML = `You are successfully registered! Please <a href="/index.html">Login</a>` ; 

            console.log('Success: User registered successfully!');

        }

        
        

    } catch(error) {
        console.log(error);
    }



});