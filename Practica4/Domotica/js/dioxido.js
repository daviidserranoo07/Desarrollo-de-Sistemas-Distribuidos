import { formatearFecha, dioxidoActual, dioxidoMaximo, dioxidoMinimo, actualizarValores, modificarEstadoFiltro, filtroDioxido } from './funciones.js';

const variacion = 50;

function modificarDioxidoActual(valor){
    let dioxidoA = parseInt(dioxidoActual.textContent);
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    if(valor){
        let dioxidoNuevo = dioxidoA + variacion;
        socket.emit('insertarDioxido', {actual: dioxidoNuevo, maxima: parseInt(dioxidoMaximo.textContent), minima: parseInt(dioxidoMinimo.textContent),fecha: fechaFormateada, estadoFiltroDioxido: filtroDioxido.textContent == 'Encendido' ? true : false});
    }else{
        let dioxidoNuevo = dioxidoA - variacion;
        socket.emit('insertarDioxido', {actual: dioxidoNuevo, maxima: parseInt(dioxidoMaximo.textContent), minima: parseInt(dioxidoMinimo.textContent),fecha: fechaFormateada, estadoFiltroDioxido: filtroDioxido.textContent == 'Encendido' ? true : false});
    }
};

function modificarDioxidoMaximo(valor){
    let dioxidoM = parseInt(dioxidoMaximo.textContent);
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    if(valor){
        let dioxidoNuevo = dioxidoM + variacion;
        socket.emit('insertarDioxido', {actual: parseInt(dioxidoActual.textContent), maxima: dioxidoNuevo, minima: parseInt(dioxidoMinimo.textContent),fecha: fechaFormateada, estadoFiltroDioxido: filtroDioxido.textContent == 'Encendido' ? true : false});
    }else{
        let dioxidoNuevo = dioxidoM - variacion;
        socket.emit('insertarDioxido', {actual: parseInt(dioxidoActual.textContent), maxima: dioxidoNuevo, minima: parseInt(dioxidoMinimo.textContent),fecha: fechaFormateada, estadoFiltroDioxido: filtroDioxido.textContent == 'Encendido' ? true : false});
    }
};

function modificarDioxidoMinimo(valor){
    let dioxidoM = parseInt(dioxidoMinimo.textContent);
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    if(valor){
        let dioxidoNuevo = dioxidoM + variacion;
        socket.emit('insertarDioxido', {actual: parseInt(dioxidoActual.textContent), maxima: parseInt(dioxidoMaximo.textContent), minima: dioxidoNuevo,fecha: fechaFormateada, estadoFiltroDioxido: filtroDioxido.textContent == 'Encendido' ? true : false});
    }else{
        let dioxidoNuevo = dioxidoM - variacion;
        socket.emit('insertarDioxido', {actual: parseInt(dioxidoActual.textContent), maxima: parseInt(dioxidoMaximo.textContent), minima: dioxidoNuevo,fecha: fechaFormateada, estadoFiltroDioxido: filtroDioxido.textContent == 'Encendido' ? true : false});
    }
};

//Manejamos los eventos de los botones al dar click para subir y bajar dioxido actual, dioxido máximo, dioxido mínimo
document.getElementById('aumentar-dioxido').addEventListener('click', function(event){
    event.preventDefault();
    modificarDioxidoActual(true);
});
document.getElementById('disminuir-dioxido').addEventListener('click', function(event){
    event.preventDefault();
    modificarDioxidoActual(false);
});

document.getElementById('aumentar-dioxido-maximo').addEventListener('click', function(event){
    event.preventDefault();
    modificarDioxidoMaximo(true);
});
document.getElementById('disminuir-dioxido-maximo').addEventListener('click', function(event){
    event.preventDefault();
    modificarDioxidoMaximo(false);
});

document.getElementById('aumentar-dioxido-minimo').addEventListener('click', function(event){
    event.preventDefault();
    modificarDioxidoMinimo(true);
});

document.getElementById('disminuir-dioxido-minimo').addEventListener('click', function(event){
    event.preventDefault();
    modificarDioxidoMinimo(false);
});

const  serviceURL = 'http://localhost:8080';
const  socket = io.connect(serviceURL);

socket.on('obtenerDioxido', (data) => {
    actualizarValores(dioxidoActual, dioxidoMaximo, dioxidoMinimo, data, 'ppm');
    console.log(data);
});

socket.on('obtenerActuadorFiltroDioxido', (data) => {
    modificarEstadoFiltro(data);
    console.log('Estado Filtro Dioxido Carbono: ',data.estadoFiltroDioxido);
});


socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});