import {
  setProfileName,
  setProfileEmail,
  displayError,
  setCircletext,
} from "./helpers/setElementContent.mjs";
import { getCurrentUserPosts, deletePostByPostId, updatePost } from "./helpers/apis.mjs";

setProfileName();
setProfileEmail();
setCircletext();

let myPosts = [];

const getMyPosts = async() => {
    myPosts = await getCurrentUserPosts();
   
    const myPostsContainer = document.getElementById('postListContainer');
    myPostsContainer.innerHTML = "";
    myPosts.map((obj) => {
        const { body, title, id } = obj;
        const itemHtml = `
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
                        <h5 class="card-title">${title}</h5>
                        <p class="card-text">${body}</p>
                        <div class="actions-container">
                            <a class="btn btn-success btn-sm btn " href="/post.html?id=${id}" role="button">view post</a>
                        </div>
                    </div>
                </div>
            </div>

        `;

        const sanitizedHtml = DOMPurify.sanitize(itemHtml);
        myPostsContainer.innerHTML += sanitizedHtml;
    });
};

getMyPosts();

// below for delete action 
document.addEventListener("click", async (evt) => {
  if (evt.target.classList.contains("delete-action")) {
    const postId = evt.target.id;
    const deletePost = await deletePostByPostId(postId);
    getMyPosts();
  }
});


// below for edit action
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
const updateForm = document.querySelector('.update-post');
const updateDisplayError = document.getElementById("updateDisplayError");
let postIdToEdit = null;

document.addEventListener("click", async (evt) => {
  if (evt.target.classList.contains("edit-action")) {
    postIdToEdit = Number(evt.target.id);
    const dataToEdit = myPosts.find(el => el.id == postIdToEdit);
    const {title, body, tags} = dataToEdit;
    const tagsJoined = tags.join(",");
    titleInputEdit.value = title;
    descriptionInputEdit.value = body;
    tagsInputEdit.value = tagsJoined;

    myModal.show();
  }
});

updateForm.addEventListener('submit', async(evt) => {
    evt.preventDefault();
    const tagsArray = tagsInputEdit.value.split(",");

    const data = {
        "title": titleInputEdit.value,
        "body": descriptionInputEdit.value,
        "tags": tagsArray
    };

    const update = await updatePost(postIdToEdit, data);
  
    if(update.errors) {
        displayError(update, updateDisplayError);
    } else {
        getMyPosts();
        myModal.hide();
        successModal.show();
    }
});

