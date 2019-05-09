module.exports.validateUser = validateUser;
module.exports.formatUserObject = formatUserObject;


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


/**
 * 
 * función que formatea el req.body del nuevo usuario en un objeto que encaje con el formate de nuestra DB
 * 
 * param: obj               (object)  
 * 
 *    
 */

function formatUserObject(obj) {

    let newObject =
    {
        idUser: '1',
        creado: JSON.stringify(new Date()),
        user: obj.userHandler,
        password: obj.userPassword,
        nombre: obj.name,
        apellido: obj.surname,
        mail: obj.email,
        usuarioAvatar: '',
        sexo: obj.gender,
        fechaDeNacimiento: obj.birthDate,
        bio: '',
        URLlink: '',
        numeroDeTel: '',
        domicilio: {
            barrio: ''
        },
        disponibilidadHoria: {
            lunes: '',
            martes: '',
            miercoles: '',
            jueves: '',
            viernes: ''
        },
        instrumentosTocados: {
            voz: '',
            bajo: '',
            guitarra: '',
            teclado: '',
            batería: '',
            otro: ''
        }
    }

    return newObject
};

