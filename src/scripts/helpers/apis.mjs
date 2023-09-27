const baseUrl = 'https://api.noroff.dev/api/v1';
export const loginEndpoint = baseUrl + '/auction/auth/login';
export const registerEndpoint = baseUrl + '/auction/auth/register';

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





