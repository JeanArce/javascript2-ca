const queryString = document.location.search;

console.log(queryString);
const urlParams = new URLSearchParams(queryString);
console.log(urlParams);
const id = urlParams.get("id");
console.log(id);

import { getPostById } from "./helpers/apis.mjs"; 
import { setPostTitle, setPostBody } from "./helpers/setElementContent.mjs";

const authorEl = document.getElementById('author');



const getPost = async() => {
    const singlePost = await getPostById(id);

    const { title, body, author } = singlePost;

    setPostTitle(title);
    setPostBody(body);

    authorEl.innerText = author.name;

};

getPost();
