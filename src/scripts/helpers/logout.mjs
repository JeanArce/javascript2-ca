
/**empty the dat
 * do logout
 */
const doLogout = () => {
    localStorage.removeItem('user');  
    window.location.href = '/index.html';
};


export default doLogout;