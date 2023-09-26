//const storedUser = JSON.parse(localStorage.getItem('user'));


const { profileName } = storedUser;
const profileNameElement = document.getElementById('profileName');
profileNameElement.innerText = profileName;


const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', () => {

        
    localStorage.removeItem('user');  // Clear user data from localStorage
    window.location.href = '/login.html';  // Redirect to the login page 
});

