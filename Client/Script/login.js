//agrega botón al cargar la pagina
window.addEventListener("load", () => {
    buildInputSectionButton();
});


/**
 * construye y muestra botones para validar o pasar a la sección de registro
 *  
 * 
 * 
 */
const buildInputSectionButton = () => {


    //se obtiene el div a modificar
    let divButtonValidate = document.getElementById('buttonvalidate');
    console.log('test5: ', divButtonValidate[0]);
   
    //se crea el html para el boton
    let buttonLogin = document.createElement("button");
    buttonLogin.appendChild(document.createTextNode('Siguiente'));
    buttonLogin.setAttribute('class', 'button-login');
    buttonLogin.addEventListener('click', () => {
        console.log('clickeo');
        getInfo();
    });
    divButtonValidate.appendChild(buttonLogin);

    //pasos idem a anterior
    let divButtonRegister = document.getElementById('buttonsignup')

    let ButtonRegister = document.createElement('button');
    ButtonRegister.appendChild(document.createTextNode('No sos usuario? Registrate'));
    ButtonRegister.setAttribute('class', 'button-register');
    ButtonRegister.addEventListener('click', () => {
        register();
    });
    divButtonRegister.appendChild(ButtonRegister);

}


/**
 * 
 * dummy ejemplo de database de perfil
 * 
 * 
 */

var profileAccounts = [
    {
        user: "claudia01",
        password: "samval9798"
    },
    {
        user: "davidTheGreatOne",
        password: "kevin4040"
    },
    {
        user: "paula1995",
        password: "onedirection95"
    }
];





/**
 * 
 * Función que muestra la contraseña en el input, switch entre oculta y visible
 *  
 */

const showPassword = () => {
    console.log("test showPassword");

    // se obtiene el div para consulta
    let auxElement = document.getElementById('pass-visibility');

    console.log(auxElement);

    //codigo que muestra u oculta dicho input
    if (auxElement.type === "password") {
        auxElement.type = 'text';
    } else {
        auxElement.type = "password";
    }
}


/**
 * Función que valida user y password 
 *
 */

const getInfo = () => {

    // elementos del DOM a consultar
    let user = document.getElementById('user');
    let pass = document.getElementById('pass');

    // se recorre y constata la existencia de ese perfil ( user y pass)
    for (let i = 0; i < profileAccounts.length; i++) {
        if (user === profileAccounts[i].user && pass === profileAccounts[i].password) {
            console.log(user, "is logged!");
            //ok
            return
        } else if (user === "" && pass === "") {
            console.log('ingrese sus datos');
            return
        }
    }
    // falta  error creation
    console.log("incorrect user or pass");
}

/**
 * función que redirige a la sección de registro
 * (falta)
 * 
 */
const register = () => {

}