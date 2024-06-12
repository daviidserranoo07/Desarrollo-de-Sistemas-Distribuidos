import { actualizarValores, luminosidadActual, luminosidadMaxima, luminosidadMinima, temperaturaActual, temperaturaMaxima, temperaturaMinima, dioxidoActual, dioxidoMaximo, dioxidoMinimo, modificarEstadoPersiana, modificarEstadoAire, modificarEstadoFiltro, encenderAire, apagarAire, subirPersiana, bajarPersiana, encenderFiltro, apagarFiltro } from './funciones.js';

//Actualizamos los 10 eventos eventos recientes en el html
function actualizarEventosRecientes(data){
    //console.log(data);
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

// function saltarAlerta(evento,clase) {
//     const alertDiv = document.getElementById('alertas');
//     const div = document.createElement('div');
//     div.textContent = evento;
//     div.classList.add(clase);
//     alertDiv.appendChild(div);
// }

// function quitarAlerta(clase){
//     const alertDiv = document.getElementById('alertas');
//     const alert = alertDiv.querySelector('.'+clase);
//     if (alert) {
//         alertDiv.removeChild(alert);
//     }
// }

function eventoTemperaturaMaxima(valor){
    const alertDiv = document.getElementById('alerta-temperatura');
    if(valor) {
        alertDiv.classList.remove('oculto');
        alertDiv.classList.add('visible');
    } else {
        alertDiv.classList.remove('visible');
        alertDiv.classList.add('oculto');
    }
}

function eventoLuminosidadMaxima(valor){
    const alertDiv = document.getElementById('alerta-luminosidad');
    if(valor) {
        alertDiv.classList.remove('oculto');
        alertDiv.classList.add('visible');
    } else {
        alertDiv.classList.remove('visible');
        alertDiv.classList.add('oculto');
    }
}

function eventoDioxidoMaximo(valor){
    const alertDiv = document.getElementById('alerta-dioxido');
    if(valor) {
        alertDiv.classList.remove('oculto');
        alertDiv.classList.add('visible');
    } else {
        alertDiv.classList.remove('visible');
        alertDiv.classList.add('oculto');
    }
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

// socket.on('connect', (data) => {
//     modificarEstadoAire(data);
//     modificarEstadoPersiana(data);
//     modificarEstadoFiltro(data);
//     eventoTemperaturaMaxima(data);
//     eventoLuminosidadMaxima(data);
//     eventoDioxidoMaximo(data);
// });

//Eventos para obtener el último valor de los sensores almacenado en la base de datos
socket.on('obtenerTemperatura', (data) => {
    actualizarValores(temperaturaActual, temperaturaMaxima, temperaturaMinima, data, 'º');
});

socket.on('obtenerLuminosidad', (data) => {
    actualizarValores(luminosidadActual, luminosidadMaxima, luminosidadMinima, data, 'lx');
});

socket.on('obtenerDioxido', (data) => {
    actualizarValores(dioxidoActual, dioxidoMaximo, dioxidoMinimo, data, 'ppm');
});

socket.on('obtenerEventosRecientes', (data) => {
    actualizarEventosRecientes(data);
});

socket.on('obtenerActuadorTemperatura', (data) => {
    modificarEstadoAire(data);
});

socket.on('obtenerActuadorLuminosidad', (data) => {
    modificarEstadoPersiana(data);
});

socket.on('obtenerActuadorFiltroDioxido', (data) => {
    modificarEstadoFiltro(data);
});

socket.on('temperaturaMaximaAviso',(data) => {
    console.log('Maxima');
    eventoTemperaturaMaxima(data);
});

socket.on('luminosidadMaximaAviso',(data) => {
    eventoLuminosidadMaxima(data);
});

socket.on('dioxidoMaximoAviso',(data) => {
    //console.log(data);
    eventoDioxidoMaximo(data);
});


socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});





