//const storedUser = JSON.parse(localStorage.getItem('user'));



const baseUrl = 'https://api.noroff.dev/api/v1';
const loginEndpoint = baseUrl + '/auction/auth/login';

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

        const loginPost = await fetch(loginEndpoint, {
            method: 'POST',
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
            },
        });

        const loginData = await loginPost.json();
        console.log(loginData);


        if(loginData.errors && loginData.errors.length) {
           
            const combinedString = loginData.errors.reduce((accumulator, obj) => {
                return accumulator + " , " + obj.message;
            }, "");

            // Remove the leading space and , at start of a string using trim
            const finalCombinedString = combinedString.trim().substring(2);
           
            errorDisplay.innerHTML = finalCombinedString;
          
        } else {

            // const { accessToken, avatar, credits, name, email } = loginData

            // localStorage.setItem('accesToken', accessToken);
            // localStorage.setItem('avatar', avatar);
            // localStorage.setItem('credits', credits);
            // localStorage.setItem('profileName', name);
            // localStorage.setItem('email', email);

            // localStorage.getItem('accesToken');

            loginData.profileName = loginData.name;
            delete loginData.name;

            localStorage.setItem('user', JSON.stringify(loginData));

            // const storedUser = JSON.parse(localStorage.getItem('user'));
            // console.log(storedUser.name);
            
            // redirect to feed page
            window.location.href = "/feed";




        }



    } catch(error) {
        console.log(error);
    }



});

    











