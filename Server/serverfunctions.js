export default validateUser;


/**
 * función que valida user y pass
 * 
 */
function validateUser(user, pass) {
    if (user === 'admin' && pass === 'admin') {
        return true;
    } else {
        return false;
    }

}
