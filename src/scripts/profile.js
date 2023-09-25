//const storedUser = JSON.parse(localStorage.getItem('user'));



const { profileName } = storedUser;
const profileNameElement = document.getElementById('profileName');
profileNameElement.innerText = profileName;