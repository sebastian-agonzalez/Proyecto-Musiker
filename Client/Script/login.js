/**
 * construye y muestra botones para validar o pasar a la sección de registro
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
        getInfoAndValidateUser();
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
 * Función que muestra la contraseña en el input, switch entre oculta y visible
 *  
 */

const showPassword = () => {
    console.log("test showPassword");

    // se obtiene el div para consulta
    let auxElement = document.getElementById('pass');

    console.log(auxElement);

    //codigo que muestra u oculta dicho input
    if (auxElement.type === "password") {

        auxElement.type = 'text';

    } else {

        auxElement.type = "password";

    }
}

/**
 * función que valida user y pass 
 * 
 */

function getInfoAndValidateUser() {
    console.log('clicking works')

    let xhr = new XMLHttpRequest();

    xhr.onload = () => {
        if (xhr.status === 200) {
            window.location.href = xhr.responseURL
        } else if (undefined) {
            //TO DO
        } else {
            //TO DO
        }
    };


    xhr.open('POST', '/validateLogin');

    let info = {
        user: document.getElementById('user').value,
        pass: document.getElementById('pass').value
    }

    console.log(info);

    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(info));
};