const temperaturaActual = document.getElementById('temperatura-actual');
const temperaturaMaxima = document.getElementById('temperatura-maxima');
const temperaturaMinima = document.getElementById('temperatura-minima');

const luminosidadActual = document.getElementById('luminosidad-actual');
const luminosidadMaxima = document.getElementById('luminosidad-maxima');
const luminosidadMinima = document.getElementById('luminosidad-minima');

const dioxidoActual = document.getElementById('dioxido-actual');
const dioxidoMaximo = document.getElementById('dioxido-maximo');
const dioxidoMinimo = document.getElementById('dioxido-minimo');

const eventoReciente = document.getElementById('name-event');
const horaEvento = document.getElementById('hour-event');

//Actualizamos el valor en el html que representa 
//cada sensor con los valores obtenidos del servidor
function actualizarTemperatura(data){
    temperaturaActual.textContent = data.actual+ 'º';
    temperaturaMaxima.textContent = data.maxima+ 'º';
    temperaturaMinima.textContent = data.minima+ 'º';
}

function actualizarLuminosidad(data){
    luminosidadActual.textContent = data.actual+ 'lx';
    luminosidadMaxima.textContent = data.maxima+ 'lx';
    luminosidadMinima.textContent = data.minima+ 'lx';
}

function actualizarDioxido(data){
    dioxidoActual.textContent = data.actual + 'ppm';
    dioxidoMinimo.textContent = data.minimo + 'ppm';
    dioxidoMaximo.textContent = data.maximo + 'ppm';
}

//Actualizamos los 10 eventos eventos recientes en el html
function actualizarEventosRecientes(data){
    console.log(data);
    let contenedorEventos = document.getElementById('events');
    contenedorEventos.innerHTML = '';

    data.forEach(eventoData => {
        //Creamos un div que contendrá la información del evento
        let divEvento = document.createElement('div');
        divEvento.className = 'event';

        //Creo un párrafo con la información del evento y su respectiva clase
        let pNombre = document.createElement('p');
        pNombre.className = 'name-event';
        pNombre.textContent = eventoData.evento;

        //Creo un párrafo con la hora del evento y su respectiva clase
        let pHora = document.createElement('p');
        pHora.className = 'hour-event';
        pHora.textContent = eventoData.fecha;

        //Añado ambos parrafos al div que contiene todo la información del evento
        divEvento.appendChild(pNombre);
        divEvento.appendChild(pHora);

        //Añado el div al contenedor de que contiene los 10 ultimos eventos
        contenedorEventos.appendChild(divEvento);
    });
}

const  serviceURL = 'http://localhost:8080';
const  socket = io.connect(serviceURL);

//Inicializamos los valores de los sensores con valores por defecto
// socket.on('temperatura', (data) => {
//     console.log('Temperatura Actual: ', data.actual);
//     console.log('Temperatura Máxima: ', data.maxima);
//     console.log('Temperatura Minima: ', data.minima);
//     socket.emit('insertarTemperatura', data);
//     actualizarTemperatura(data);
// }); 

// socket.on('luminosidad', (data) => {
//     console.log('Luminosidad Actual: ', data.actual);
//     console.log('Luminosidad Máxima: ', data.maxima);
//     console.log('Luminosidad Minima: ', data.minima);
//     socket.emit('insertarLuminosidad', data);
//     actualizarLuminosidad(data);
// }); 

// socket.on('dioxido', (data) => {
//     console.log('Dioxido Actual: ', data.actual);
//     console.log('Dioxido Máximo: ', data.maximo);
//     console.log('Dioxido Minimo: ', data.minimo);
//     socket.emit('insertarDioxido', data);
//     actualizarDioxido(data);
// }); 

//Eventos para obtener el último valor de los sensores almacenado en la base de datos
socket.on('obtenerTemperatura', (data) => {
    console.log('Temperatura Actual: ', data.actual);
    console.log('Temperatura Máxima: ', data.maxima);
    console.log('Temperatura Minima: ', data.minima);
    actualizarTemperatura(data);
});

socket.on('obtenerLuminosidad', (data) => {
    console.log('Luminosidad Actual: ', data.actual);
    console.log('Luminosidad Máxima: ', data.maxima);
    console.log('Luminosidad Minima: ', data.minima);
    actualizarLuminosidad(data);
});

socket.on('obtenerDioxido', (data) => {
    console.log('Dioxido Actual: ', data.actual);
    console.log('Dioxido Máximo: ', data.maximo);
    console.log('Dioxido Minimo: ', data.minimo);
    actualizarDioxido(data);
});

socket.on('obtenerEventosRecientes', (data) => {
    console.log('Eventos Recientes: ', data);
    actualizarEventosRecientes(data);
});

//Evento de cuando un cliente se desconecta del servidor
socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});





