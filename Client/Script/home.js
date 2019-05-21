/**
 * 
 * función que toma info ingresada para guardar un nuevo post en la DB
 * 
 */

function getInfoToDoNewPost() {

    //objeto request
    let xhr = new XMLHttpRequest();

    //procesa respuesta
    xhr.onload = () => {

        if (xhr.status === 200) {

            window.location.href = xhr.responseURL

        } else if (undefined) {
            //TO DO
        } else {
            //TO DO
        }
    };

    //var. para guardar datos ingresados por el usuario
    let info = {
        title: document.getElementById('title').value,
        description: document.getElementById('description').value,
        //image: 
        timeAvailability: document.getElementById('time-availability').value,
        instrument: document.getElementById('played-instrument').value,
        city: document.getElementById('city').value
    }

    //establezco endpoint para interactuar con el server
    xhr.open('POST', '/newPost');

    console.log(info);
    //config de header
    xhr.setRequestHeader('Content-type', 'application/json');
    //envío del objeto con los datos 
    xhr.send(JSON.stringify(info));

};


