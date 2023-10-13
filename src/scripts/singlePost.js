const queryString = document.location.search;
const urlParams = new URLSearchParams(queryString);
const id = urlParams.get("id");

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
