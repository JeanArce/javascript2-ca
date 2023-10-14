/**
 * Retrieves user data from local storage and displays user profile information.
 * @module UserProfile
 * 
 * Represents the user data retrieved from local storage.
 * @typedef {Object} StoredUser
 * @property {string} profileName - The profile name of the user.
 */

const storedUser = JSON.parse(localStorage.getItem('user'));
import {
  setProfileName,
  setProfileEmail,
  displayError,
  setCircletext,
  setEndpointError,
  clearEndPointError,
  isValidUrl
} from "./helpers/setElementContent.mjs";

setProfileName();
setProfileEmail();
setCircletext();

import {
  getPostsEndpoint,
  doSecureFetch,
  createPostEndpoint,
  deletePostByPostId,
  updatePost,
  geFeedPosts
} from "./helpers/apis.mjs";

let postToIterate = [];
let firsLoad = false;
let currentTag = '';
let globalTags = null;

const getPosts = async(isSearch=false, param='', tag=null) => {
    
    try {
    
        let allPosts;
        if(tag) {
            allPosts = await geFeedPosts(tag);
        } else {
            allPosts = await geFeedPosts();
        }

        const postListContainer = document.getElementById('postListContainer');
        postListContainer.innerHTML = "";
        if(isSearch) {
            if(param == '') {
            postToIterate = allPosts;
            } else {
                postToIterate = allPosts.filter((element, index) => {
                    if (
                    element.title.includes(param) ||
                    element.body.includes(param) ||
                    element.title.includes(param.toLowerCase()) ||
                    element.body.includes(param.toLowerCase)
                    ) {
                    return element;
                    }
                });
            }
        } else {
            postToIterate = allPosts;
        }

        if(postToIterate.length) {
            postToIterate.map((obj) => {
                const { body, title, id, author, tags, media } = obj;

                let postImage = '';
                if(media) {
                    postImage = `
                        <div class="post-image-container mb-2">
                            <img src="${media}" class="img-fluid"/>
                        </div>
                    `;
                } 

                let itemHtml = '';
                if(storedUser.profileName == author.name) {
                    itemHtml = `
                        <div class="col-sm-12 mb-4">
                            <div class="card">
                                <div class="dropdown">
                                    <button class="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton1" data-bs-toggle="dropdown" aria-expanded="false">
                                        <span></span>
                                        <span></span>
                                        <span></span>
                                    </button>
                                    <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
                                        <li class="px-3 edit-action" id="${id}">Edit</li>
                                        <li class="px-3 delete-action" id="${id}">Delete</li>
                                    </ul>
                                </div>
                                <div class="card-body">
                                    <p class="rounded-circle imageUser d-flex align-items-center justify-content-center">${
                                      author.name[0]
                                    }</p>
                                    ${postImage}
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${body}</p>
                                    <div class="actions-container">
                                        <a class="btn btn-success btn-sm btn" href="/post.html?id=${id}" role="button">view post</a>
                                    </div>
                                    <p class="mt-2"><strong>Tags:</strong> ${tags.join(
                                      ", "
                                    )}</p>
                                </div>
                            </div>
                        </div>
                    `;
                } else {
                    itemHtml = `
                        <div class="col-sm-12 mb-4">
                            <div class="card">
                                <div class="card-body">
                                    <p class="rounded-circle imageUser d-flex align-items-center justify-content-center">${
                                      author.name[0]
                                    }</p>   
                                    ${postImage}   
                                    <h5 class="card-title">${title}</h5>
                                    <p class="card-text">${body}</p>  
                                    <div class="actions-container">
                                        <a class="btn btn-success btn-sm btn" href="/post.html?id=${id}" role="button">view post</a>
                                    </div>
                                    <p class="mt-2"><strong>Tags:</strong> ${tags.join(
                                      ", "
                                    )}</p>
                                </div>
                            </div>
                        </div>

                    `;
                }

                const sanitizedHtml = DOMPurify.sanitize(itemHtml);
                postListContainer.innerHTML += sanitizedHtml;
            });
        } else {
            postListContainer.innerHTML = `
                <p>No posts found.</p>
            `;
        }

        const tagsContainer = document.querySelector(".tagsContainer");
        if(!firsLoad) {
            tagsContainer.innerHTML = "";
            const combinedTags = postToIterate.reduce(
                (acc, obj) => acc.concat(obj.tags),
                []
            );

            const nonEmptyTags = combinedTags.filter((el) => {
                if (el !== "") {
                    return el;
                }
            });

            const uniqueTags = [...new Set(nonEmptyTags)];
            uniqueTags.map((el) => {
                const elVal = `
                    <span class="badge rounded-pill bg-dark text-light p-3 m-1" id="${el}">${el}</span>
                `;
                tagsContainer.innerHTML += elVal;
            });

            globalTags = uniqueTags;
            firsLoad = true;
        } else {
            tagsContainer.innerHTML = "";
            globalTags.map((el) => {
                let elVal;
                if(el === tag) {
                    elVal = `
                        <span class="badge rounded-pill bg-info text-light p-3 m-1" id="${el}">${el}</span>
                    `;
                } else {
                    elVal = `
                        <span class="badge rounded-pill bg-dark text-light p-3 m-1" id="${el}">${el}</span>
                    `;
                }
                tagsContainer.innerHTML += elVal;
            });
        }
    } catch(error) {
        console.log('the error is now ', error);
        setEndpointError();
    }


  
};

getPosts();

const createPostForm = document.querySelector('.create-post');
const title = document.getElementById('titleInput');
const body = document.getElementById('descriptionInput');
const tags = document.getElementById('tagsInput');
const media = document.getElementById('mediaInput');
const createDisplayError = document.getElementById('createDisplayError');

createPostForm.addEventListener('submit',  async(evt) => {
    evt.preventDefault();

    if(media.value.trim() != '' && !isValidUrl(media.value.trim())) {
        createDisplayError.innerHTML = "Please enter valid media url";
        return;
    }

    try {
        const tagsArray = tags.value.split(",");
        const data ={
            "title": title.value,
            "body": body.value,
            "tags": tagsArray,
            "media": media.value.trim()
        };
        const create = await doSecureFetch(createPostEndpoint, 'POST', data);
        if(create.errors) {
            displayError(create,  createDisplayError);
        } else {
            getPosts();
            createPostForm.reset();
            createDisplayError.innerHTML = '';
        }
    } catch(error) {
        console.log(error);
        setEndpointError();
    }


});

document.addEventListener('click', async(evt) => {
    if (evt.target.classList.contains('delete-action')) {
        try {
            const postId = evt.target.id;
            const deletePost = await deletePostByPostId(postId);
            getPosts();
        } catch(error) {
            console.log(error);
            setEndpointError();
        }
    }
});

// below for search form
const searchForm = document.getElementById("searchForm");
const searchInput = document.getElementById("searchInput");
const closeSearch = document.querySelector(".closeSearch");

const typingDelay = 500;
let typingTimer;

const onTypingFinished = () => {
    if(searchInput.value) {
        closeSearch.classList.remove('visually-hidden');
    } else {
        closeSearch.classList.add("visually-hidden");
        getPosts(false, "", null);
    }
};

searchInput.addEventListener('input', (evt) => {
    clearTimeout(typingTimer); 
    typingTimer = setTimeout(onTypingFinished, typingDelay);
});

searchForm.addEventListener('submit', (evt) => {
    evt.preventDefault();
    currentTag = "";
    getPosts(true, searchInput.value);
});

// clear search
closeSearch.addEventListener('click', (evt) =>{
    console.log('clciking the close search');
    getPosts(false, "", null);
    searchInput.value = '';
    closeSearch.classList.add("visually-hidden");
});

//  below for edit action
const myModal = new bootstrap.Modal(document.getElementById("editModal"), {
    keyboard: false,
    backdrop: "static"
});

const successModal = new bootstrap.Modal(document.getElementById("successModal"),{
    keyboard: false,
    backdrop: "static",
});

const titleInputEdit = document.getElementById("titleInputEdit"); 
const descriptionInputEdit = document.getElementById("descriptionInputEdit");
const tagsInputEdit = document.getElementById("tagsInputEdit");
const mediaInputEdit = document.getElementById("mediaInputEdit");
const updateForm = document.querySelector('.update-post');
const updateDisplayError = document.getElementById("updateDisplayError");
let postIdToEdit = null;

document.addEventListener("click", async (evt) => {
    if (evt.target.classList.contains("edit-action")) {
        postIdToEdit = Number(evt.target.id);
        const dataToEdit = postToIterate.find((el) => el.id == postIdToEdit);
        const {title, body, tags, media} = dataToEdit;
        const tagsJoined = tags.join(",");
        titleInputEdit.value = title;
        descriptionInputEdit.value = body;
        tagsInputEdit.value = tagsJoined;
        mediaInputEdit.value = media;
        myModal.show();
    }
});

updateForm.addEventListener('submit', async(evt) => {
   
    evt.preventDefault();

     if (
       mediaInputEdit.value.trim() != "" &&
       !isValidUrl(mediaInputEdit.value.trim())
     ) {
       updateDisplayError.innerHTML = "Please enter valid media url";
       return;
     }


    const tagsArray = tagsInputEdit.value.split(",");
    const data = {
      title: titleInputEdit.value,
      body: descriptionInputEdit.value,
      tags: tagsArray,
      media: mediaInputEdit.value.trim(),
    };

    try {
        const update = await updatePost(postIdToEdit, data);
    
        if(update.errors) {
            displayError(update, updateDisplayError);
        } else {
            getPosts();
            myModal.hide();
            successModal.show();
        }
    } catch(error) {
        console.log(error);
        setEndpointError();
    }
});

// below for tags click
document.addEventListener("click", (evt) => {
    if (evt.target.classList.contains("badge")) {
        const tag = evt.target.id;
        searchInput.value = '';
        currentTag = tag; 

        if(evt.target.classList.contains("bg-info")) {
            getPosts(false, "", null);
        } else {
            getPosts(false, "", tag);
        }
    }
});


// listener for clear endpoint error 
clearEndPointError();