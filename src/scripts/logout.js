import doLogout from "./helpers/logout.mjs";

const logoutButton = document.getElementById('logoutButton');
logoutButton.addEventListener('click', () => {
    doLogout();
});
