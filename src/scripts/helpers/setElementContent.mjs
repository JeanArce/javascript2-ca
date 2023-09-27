const storedUser = JSON.parse(localStorage.getItem('user'));


export const setProfileName = () => {

    const profileNameEl = document.getElementById('profileName');
    profileNameEl.innerText = storedUser.profileName;
};


export const setProfileEmail = () => {
    const profileEmailEl = document.getElementById('profileEmail');
    profileEmailEl.innerText = storedUser.email;
};


export const displayError = (data, errorEl, successEl=null) => {

    const combinedString = data.errors.reduce((accumulator, obj) => {
        return accumulator + " , " + obj.message;
    }, "");

    // Remove the leading space and , at start of a string using trim
    const finalCombinedString = combinedString.trim().substring(2);

    errorEl.innerHTML = finalCombinedString;

    if(successEl) {
        successEl.innerHTML = '';
    }
   

};




