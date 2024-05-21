import { formatearFecha, luminosidadActual, luminosidadMaxima, luminosidadMinima, persiana, actualizarValores, modificarEstadoPersiana } from './funciones.js';

const variacion = 50;

function modificarLuminosidadActual(valor){
    let luminosidadA = parseInt(luminosidadActual.textContent);
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    if(valor){
        let luminosidadNueva = luminosidadA + variacion;
        socket.emit('insertarLuminosidad', {actual: luminosidadNueva, maxima: parseInt(luminosidadMaxima.textContent), minima: parseInt(luminosidadMinima.textContent),fecha: fechaFormateada, estadoPersiana: persiana.textContent == 'Subida' ? true : false});
    }else{
        let luminosidadNueva = luminosidadA - variacion;
        socket.emit('insertarLuminosidad', {actual: luminosidadNueva, maxima: parseInt(luminosidadMaxima.textContent), minima: parseInt(luminosidadMinima.textContent),fecha: fechaFormateada, estadoPersiana: persiana.textContent == 'Subida' ? true : false});
    }
};

function modificarLuminosidadMaxima(valor){
    let luminosidadM = parseInt(luminosidadMaxima.textContent);
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    if(valor){
        let luminosidadNueva = luminosidadM + variacion;
        socket.emit('insertarLuminosidad', {actual: parseInt(luminosidadActual.textContent), maxima: luminosidadNueva, minima: parseInt(luminosidadMinima.textContent),fecha: fechaFormateada, estadoPersiana: persiana.textContent == 'Subida' ? true : false});
    }else{
        let luminosidadNueva = luminosidadM - variacion;
        socket.emit('insertarLuminosidad', {actual: parseInt(luminosidadActual.textContent), maxima: luminosidadNueva, minima: parseInt(luminosidadMinima.textContent),fecha: fechaFormateada, estadoPersiana: persiana.textContent == 'Subida' ? true : false});
    }
};

function modificarLuminosidadMinima(valor){
    let luminosidadM = parseInt(luminosidadMinima.textContent);
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    if(valor){
        let luminosidadNueva = luminosidadM + variacion;
        socket.emit('insertarLuminosidad', {actual: parseInt(luminosidadActual.textContent), maxima: parseInt(luminosidadMaxima.textContent), minima: luminosidadNueva,fecha: fechaFormateada, estadoPersiana: persiana.textContent == 'Subida' ? true : false});
    }else{
        let luminosidadNueva = luminosidadM - variacion;
        socket.emit('insertarLuminosidad', {actual: parseInt(luminosidadActual.textContent), maxima: parseInt(luminosidadMaxima.textContent), minima: luminosidadNueva,fecha: fechaFormateada, estadoPersiana: persiana.textContent == 'Subida' ? true : false});
    }
};

//Manejamos los eventos de los botones al dar click para subir y bajar luminosidad actual, luminosidad máxima, luminosidad minima
document.getElementById('aumentar-luminosidad').addEventListener('click', function(event){
    event.preventDefault();
    modificarLuminosidadActual(true);
});
document.getElementById('disminuir-luminosidad').addEventListener('click', function(event){
    event.preventDefault();
    modificarLuminosidadActual(false);
});

document.getElementById('aumentar-luminosidad-maxima').addEventListener('click', function(event){
    event.preventDefault();
    modificarLuminosidadMaxima(true);
});
document.getElementById('disminuir-luminosidad-maxima').addEventListener('click', function(event){
    event.preventDefault();
    modificarLuminosidadMaxima(false);
});

document.getElementById('aumentar-luminosidad-minima').addEventListener('click', function(event){
    event.preventDefault();
    modificarLuminosidadMinima(true);
});

document.getElementById('disminuir-luminosidad-minima').addEventListener('click', function(event){
    event.preventDefault();
    modificarLuminosidadMinima(false);
});

const  serviceURL = 'http://localhost:8080';
const  socket = io.connect(serviceURL);

socket.on('obtenerLuminosidad', (data) => {
    actualizarValores(luminosidadActual, luminosidadMaxima, luminosidadMinima, data, 'lx');
});

socket.on('obtenerActuadorLuminosidad', (data) => {
    modificarEstadoPersiana(data);
});


socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});