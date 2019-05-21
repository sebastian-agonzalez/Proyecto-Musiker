module.exports.formatPostObject = formatPostObject;
module.exports.formatUserObject = formatUserObject;


/**
 * función que formatea el req.body del nuevo usuario en un objeto que encaje con el formate de nuestra DB
 * 
 * @param {object} obj     objeto con los valores ingresados por el usuario
 */

function formatUserObject(obj) {
    

    let newObject =
    {
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




/**
 * función que formatea el nuevo objeto de post a nuestros requerimientos
 * 
 * @param {object} obj        objeto con los valores ingresados por el usuario
 * @param {object} obj2       objeto referencia a la session
 * 
 * 
 */
function formatPostObject(obj, obj2) {

    let newObject = {
        idUser: '',
        userHandle: obj2.userId,
        idPost: '',
        titulo: obj.title,
        descripcion: obj.description,
        disponibilidadHoraria: obj.timeAvailability,
        instrumento: obj.instrument,
        ciudad: obj.city
    }

    return newObject;
}