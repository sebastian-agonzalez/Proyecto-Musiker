//eventlistener para cargar posts desde la database cuando hay un GET al home





/**
 * 
 * función que toma info ingresada para guardar un nuevo post en la DB
 * 
 */

function getInfoToDoNewPost() {

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


let info = {
    title: document.getElementById('title').value,
    description: document.getElementById('description').value,
    //image: 
    timeAvailability: document.getElementById('time-availability').value,
    instrument: document.getElementById('played-instrument').value,
    city: document.getElementById('city').value
}

xhr.open('POST', '/newPost'); 

console.log(info);

xhr.setRequestHeader('Content-type', 'application/json');
xhr.send(JSON.stringify(info));

};


