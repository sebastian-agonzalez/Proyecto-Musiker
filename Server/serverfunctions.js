module.exports.validateUser = validateUser;
module.exports.formatUserObject = formatUserObject;

let userCounter = 7;


/**
 * función que formatea el req.body del nuevo usuario en un objeto que encaje con el formate de nuestra DB
 * 
 * @param {object} obj 
 */

function formatUserObject(obj) {
    

    let newObject =
    {
        idUser: 0,
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

