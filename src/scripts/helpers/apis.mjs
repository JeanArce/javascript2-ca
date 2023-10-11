/**
 * /**
 * Retrieves user data from local storage, sets profile name, and defines API endpoints.
 * @typedef {Object} User
 * @property {string} profileName - The profile name of the user.
 * 
 * Parses the user data stored in local storage.
 * @type {?User}
 * 
 * The profile name obtained from the stored user data, or an empty string if no user data is present.
 * 
 *  Base URL for Noroff API.
 * 
 * Endpoint for user authentication,
 * for registration, for retrieving posts with specific query parameters,
 * for retrieving posts specific to the user's profile, for creating new posts.
 *  @type {string}
 * 
 */
 



const storedUser = JSON.parse(localStorage.getItem('user'));

const profileName = storedUser ?  storedUser.profileName : '';


const baseUrl = 'https://api.noroff.dev/api/v1';
export const loginEndpoint = baseUrl + '/social/auth/login';
export const registerEndpoint = baseUrl + '/social/auth/register';
export const getPostsEndpoint = baseUrl + '/social/posts?&_active=true&_author=true&_comments=true&_reactions=true';
export const getMyPostsEndpoint = baseUrl + `/social/profiles/${profileName}/posts`;
export const createPostEndpoint = baseUrl + '/social/posts';


/**
 * 
 * @param {string} endpoint 
 * @param {object} data 
 * @returns 
 */
export const doExecuteFetch = async(endpoint, data) => {
    const executeFetch = await fetch(endpoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
    });

    const executeData = await executeFetch.json();

    return executeData;
}

/**
 * 
 * @param {string} endpoint 
 * @param {string} method 
 * @param {object} data 
 * @returns 
 */
export const doSecureFetch = async(endpoint, method, data=null) => {
    if(method == 'GET') {

        const executeFetch = await fetch(endpoint, {
            method: method,
            headers: {
                Authorization: `Bearer ${storedUser.accessToken}`,
            },
        });

        const executeData = await executeFetch.json();

        return executeData;

    } else if(method == 'POST') {


        const executeFetch = await fetch(endpoint, {
            method: method,
            body: JSON.stringify(data),
            headers: {
                'Content-type': 'application/json; charset=UTF-8',
                Authorization: `Bearer ${storedUser.accessToken}`,
            },
        });

        const executeData = await executeFetch.json();

        return executeData;
    } else {
        return null;
    }
}

/**
 * 
 * @param {*} otherUsername 
 * @returns 
 */
export const fetchOthersPost = async(otherUsername) => {

    const otherPostsEndpoint = baseUrl + `/social/profiles/${otherUsername}/posts`;
    const executeFetch = await fetch(endpoint, {
        method: method,
        headers: {
            Authorization: `Bearer ${storedUser.accessToken}`,
        },
    });

    const executeData = await executeFetch.json();

    return executeData;
}

/**
 * 
 * @returns 
 */
export const getCurrentUserPosts = async() => {
    const getMyPostsEndpoint = baseUrl + `/social/profiles/${storedUser.profileName}/posts?&_active=true&_author=true&_comments=true&_reactions=true`;

    const executeFetch = await fetch(getMyPostsEndpoint, {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${storedUser.accessToken}`,
        },
    });

    const executeData = await executeFetch.json();

    return executeData;
}


export const deletePostByPostId = async(postId) => {
   
    const deletePostEndpoint = baseUrl + `/social/posts/${postId}`;

    const executeFetch = await fetch(deletePostEndpoint, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${storedUser.accessToken}`,
        },
    });

    const executeData = await executeFetch.json();

    return executeData;
};

export const getPostById = async(id) => {

    const getSingleEntryEndpoint = baseUrl + `/social/posts/${id}?&_author=true`;

    const executeFetch = await fetch(getSingleEntryEndpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${storedUser.accessToken}`,
      },
    });

    const executeData = await executeFetch.json();

    return executeData;

};


export const updatePost = async (id, data) => {
  const updateEndpoint = baseUrl + `/social/posts/${id}`;

  console.log('data pass is ', data);

  const executeFetch = await fetch(updateEndpoint, {
    method: "PUT",
    body: JSON.stringify(data),
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${storedUser.accessToken}`
    },
  });

  const executeData = await executeFetch.json();

  return executeData;
};



export const geFeedPosts = async (tag=null) => {

    let endpoint;
    if(tag) {
        endpoint = baseUrl + `/social/posts?&_active=true&_author=true&_comments=true&_reactions=true&_tag=${tag}`;
    } else {
        endpoint =
          baseUrl +
          `/social/posts?&_active=true&_author=true&_comments=true&_reactions=true`;
    }
   

    const executeFetch = await fetch(endpoint, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${storedUser.accessToken}`,
      },
    });

    const executeData = await executeFetch.json();

    return executeData;
 
};
