
//const storedUser = JSON.parse(localStorage.getItem('user'));

const profileNameEl = document.getElementById('profileName');

profileNameEl.innerText = storedUser.profileName;


const logoutButton = document.getElementById('logoutButton');

logoutButton.addEventListener('click', () => {

    
    localStorage.removeItem('user');  // Clear user data from localStorage

    window.location.href = '/login.html'; // Redirect to the login page 

});

