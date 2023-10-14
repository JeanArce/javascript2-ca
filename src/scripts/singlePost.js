const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

import { getPostById } from "./helpers/apis.mjs"; 
import { setPostTitle, setPostBody, setEndpointError, clearEndPointError } from "./helpers/setElementContent.mjs";

const authorEl = document.getElementById('author');
const getPost = async() => {

    const mediaContainer = document.getElementById("mediaContainer");

    try {
        const singlePost = await getPostById(id);
        const { title, body, author, media } = singlePost;

        if(media) {
            let postImage = `
                <div class="post-image-container mb-2">
                    <img src="${media}" class="img-fluid"/>
                </div>
            `;
            mediaContainer.innerHTML = postImage;
        }

        setPostTitle(title);
        setPostBody(body);
    authorEl.innerText = author.name;
    } catch(error) {
        console.log(error);
        setEndpointError();
    }
};

getPost();


// listen to close endpoint error
clearEndPointError();

