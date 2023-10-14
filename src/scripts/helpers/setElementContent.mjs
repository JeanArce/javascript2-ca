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
    
    const finalCombinedString = combinedString.trim().substring(2);
    errorEl.innerHTML = finalCombinedString;
    if(successEl) {
        successEl.innerHTML = '';
    }
};

export const setPostTitle = (value) => {
  const cartTitle = document.querySelector(".card-title");
  cartTitle.innerText = value;
};

export const setPostBody = (value) => {
    const cardBody = document.querySelector('.card-text');
    cardBody.innerHTML = value;
}

export const setCircletext = () => {
  const circle = document.querySelector(".circleProfile");
  circle.innerHTML = storedUser.profileName[0];
};


export const setEndpointError = () => {
    const errorContainer = document.getElementById("endpointErrorContainer");
    errorContainer.innerHTML = `
        <div class="bg-warning p-2 d-flex">
            <p class="m-0">Something went wrong..</p>
            <p class="closeEndpointError ms-auto m-0">&#x2715;</p>
        </div>
    `;
};


export const clearEndPointError = () => {

    document.addEventListener("click", async (evt) => {
      if (evt.target.classList.contains("closeEndpointError")) {
        const errorContainer = document.getElementById("endpointErrorContainer");
        errorContainer.innerHTML = ``;
      }
    });
};