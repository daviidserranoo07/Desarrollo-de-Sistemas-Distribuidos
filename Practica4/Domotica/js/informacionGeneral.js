import { actualizarValores, luminosidadActual, luminosidadMaxima, luminosidadMinima, temperaturaActual, temperaturaMaxima, temperaturaMinima, dioxidoActual, dioxidoMaximo, dioxidoMinimo, modificarEstadoPersiana, modificarEstadoAire, modificarEstadoFiltro } from './funciones.js';

//Actualizamos los 10 eventos eventos recientes en el html
function actualizarEventosRecientes(data){
    console.log(data);
    let contenedorEventos = document.getElementById('events');
    contenedorEventos.innerHTML = '';

    data.forEach(eventoData => {
        let divEvento = document.createElement('div');
        divEvento.className = 'event';

        let pNombre = document.createElement('p');
        pNombre.className = 'name-event';
        pNombre.textContent = eventoData.evento;

        let pHora = document.createElement('p');
        pHora.className = 'hour-event';
        pHora.textContent = eventoData.fecha;

        divEvento.appendChild(pNombre);
        divEvento.appendChild(pHora);

        contenedorEventos.appendChild(divEvento);
    });
}

function saltarAlerta(evento,clase) {
    const alertDiv = document.getElementById('alertas');
    const div = document.createElement('div');
    div.textContent = evento;
    div.classList.add(clase);
    alertDiv.appendChild(div);
}

function quitarAlerta(clase){
    const alertDiv = document.getElementById('alertas');
    const alert = alertDiv.querySelector('.'+clase);
    if (alert) {
        alertDiv.removeChild(alert);
    }
}

function eventoTemperaturaMaxima(valor){
    let clase = 'temperatura';
    if(valor) saltarAlerta('Alerta de temperatura máxima',clase);
    else quitarAlerta(clase);
}

function eventoLuminosidadMaxima(valor){
    let clase = 'luminosidad';
    if(valor) saltarAlerta('Alerta de luminosidad máxima',clase);
    else quitarAlerta(clase);
}

function eventoDioxidoMaximo(valor){
    let clase = 'dioxido';
    if(valor) saltarAlerta('Alerta de dióxido máximo',clase);
    else quitarAlerta(clase);
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
//     console.log('Dioxido Máximo: ', data.maxima);
//     console.log('Dioxido Minimo: ', data.minima);
//     socket.emit('insertarDioxido', data);
//     //actualizarValores(dioxidoActual, dioxidoMaximo, dioxidoMinimo, data, 'ppm');
// }); 

//Eventos para obtener el último valor de los sensores almacenado en la base de datos
socket.on('obtenerTemperatura', (data) => {
    actualizarValores(temperaturaActual, temperaturaMaxima, temperaturaMinima, data, 'º');
    modificarEstadoAire(data);
});

socket.on('obtenerLuminosidad', (data) => {
    actualizarValores(luminosidadActual, luminosidadMaxima, luminosidadMinima, data, 'lx');
    modificarEstadoPersiana(data);
});

socket.on('obtenerDioxido', (data) => {
    actualizarValores(dioxidoActual, dioxidoMaximo, dioxidoMinimo, data, 'ppm');
    modificarEstadoFiltro(data);
});

socket.on('obtenerEventosRecientes', (data) => {
    actualizarEventosRecientes(data);
});

socket.on('obtenerActuadorTemperatura', (data) => {
    modificarEstadoAire(data);
    eventoTemperaturaMaxima(data.estadoAire);
});

socket.on('obtenerActuadorLuminosidad', (data) => {
    modificarEstadoPersiana(data);
    eventoLuminosidadMaxima(data.estadoPersiana);
});

socket.on('obtenerActuadorFiltroDioxido', (data) => {
    modificarEstadoFiltro(data);
    eventoDioxidoMaximo(data.estadoFiltroDioxido);
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});





