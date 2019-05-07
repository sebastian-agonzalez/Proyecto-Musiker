/*
 * 
 * Función para habilitar primera sección de la carga de datos
 * 
 * 
 */
function goToSignup1rstSection() {
    //obtengo divs del dom
    let firstSection = document.getElementById('info-first-section');
    let secondSection = document.getElementById('info-second-section');
    let previousButton = document.getElementById('previous');
    let nextButton = document.getElementById('next');
    //let okButton = document.getElementById('ok-button');

    // modifico el display de las secciones
    firstSection.style.display = 'block';
    secondSection.style.display = 'none';
    previousButton.style.display = 'none'
    nextButton.style.display = 'inline';
    //okButton.style.display = "none";
}

/**
 * 
 * Función para habilitar segunda sección de la carga de datos
 * 
 * 
 */
function goToSignup2ndSection() {
    //obtengo divs del dom
    let firstSection = document.getElementById('info-first-section');
    let secondSection = document.getElementById('info-second-section');
    let previousButton = document.getElementById('previous');
    let nextButton = document.getElementById('next');
    let divButtons = document.getElementById('buttons');

    // modifico el display de las secciones
    firstSection.style.display = 'none'
    secondSection.style.display = 'block';
    previousButton.style.display = 'inline';
    nextButton.style.display = 'none';
    /*
        //creo botón para submitear todos los datos
        
            let okButton = document.createElement('Button');
            okButton.appendChild(document.createTextNode('Okey!'));
            okButton.setAttribute('id', 'ok-button');
            //le atribuyo el evento para que realice la creación de usuario
            okButton.addEventListener('click', () => {
                //
            });
            divButtons.appendChild(okButton);
    */
}

function getAndSendInfo() {

    //construyo objeto HttpRequest
    let xhr = new XMLHttpRequest();
    //defino lo que sucede cuando obtengo una respuesta
    xhr.onload = () => {
        if (xhr.status === 200) {
            window.location.href = xhr.responseText;
        } else if (xhr.status === 403) {


        } else {

        }
    }
    //defino el método y endpoint
    xhr.open("POST", "/dosignup");

    //variable auxiliar para enviar los datos de la info de registro
    let info = {
        name: document.getElementById('name').value,
        surname: document.getElementById('surname').value,
        email: document.getElementById('email').value,
        //gender: undefined // RESOLVER CÓMO
        birthDate: document.getElementById('birth-date').value,
        userHandler: document.getElementById('user-handler').value,
        userAvatar: document.getElementById('avatar').value
    }
    console.log(info);
    xhr.setRequestHeader('Content-type', 'application/json');
    xhr.send(JSON.stringify(info));
}