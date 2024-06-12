import { formatearFecha, temperaturaActual, temperaturaMaxima, temperaturaMinima, aireAcondicionado, actualizarValores, modificarEstadoAire, encenderAire, apagarAire } from './funciones.js';

const variacion = 1;

function modificarTemperaturaActual(valor){
    let temperaturaA = parseInt(temperaturaActual.textContent);
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    if(valor){
        let temperaturaNueva = temperaturaA + variacion;
        socket.emit('insertarTemperatura', {actual: temperaturaNueva, maxima: parseInt(temperaturaMaxima.textContent), minima: parseInt(temperaturaMinima.textContent),fecha: fechaFormateada, estadoAire: aireAcondicionado.textContent == 'Encendido' ? true : false});
    }else{
        let temperaturaNueva = temperaturaA - variacion;
        socket.emit('insertarTemperatura', {actual: temperaturaNueva, maxima: parseInt(temperaturaMaxima.textContent), minima: parseInt(temperaturaMinima.textContent),fecha: fechaFormateada, estadoAire: aireAcondicionado.textContent == 'Encendido' ? true : false});
    }
};

function modificarTemperaturaMaxima(valor){
    let temperaturaM = parseInt(temperaturaMaxima.textContent);
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    if(valor){
        let temperaturaNueva = temperaturaM + variacion;
        socket.emit('insertarTemperatura', {actual: parseInt(temperaturaActual.textContent), maxima: temperaturaNueva, minima: parseInt(temperaturaMinima.textContent),fecha: fechaFormateada, estadoAire: aireAcondicionado.textContent == 'Encendido' ? true : false});
    }else{
        let temperaturaNueva = temperaturaM - variacion;
        socket.emit('insertarTemperatura', {actual: parseInt(temperaturaActual.textContent), maxima: temperaturaNueva, minima: parseInt(temperaturaMinima.textContent),fecha: fechaFormateada, estadoAire: aireAcondicionado.textContent == 'Encendido' ? true : false});
    }
};

function modificarTemperaturaMinima(valor){
    let temperaturaM = parseInt(temperaturaMinima.textContent);
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    if(valor){
        let temperaturaNueva = temperaturaM + variacion;
        socket.emit('insertarTemperatura', {actual: parseInt(temperaturaActual.textContent), maxima: parseInt(temperaturaMaxima.textContent), minima: temperaturaNueva,fecha: fechaFormateada, estadoAire: aireAcondicionado.textContent == 'Encendido' ? true : false});
    }else{
        let temperaturaNueva = temperaturaM - variacion;
        socket.emit('insertarTemperatura', {actual: parseInt(temperaturaActual.textContent), maxima: parseInt(temperaturaMaxima.textContent), minima: temperaturaNueva,fecha: fechaFormateada, estadoAire: aireAcondicionado.textContent == 'Encendido' ? true : false});
    }
};

encenderAire.addEventListener('click', function(event){
    event.preventDefault();
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    socket.emit('insertarTemperatura', {actual: parseInt(temperaturaActual.textContent), maxima: parseInt(temperaturaMaxima.textContent), minima: parseInt(temperaturaMinima.textContent),fecha: fechaFormateada, estadoAire: true});
    socket.emit('insertarEventoReciente', {evento: 'El usuario ha encendido el aire',fecha: fechaFormateada});
    socket.emit('actuadorTemperaturaModificado', {actual: parseInt(temperaturaActual.textContent), maxima: parseInt(temperaturaMaxima.textContent), minima: parseInt(temperaturaMinima.textContent),fecha: fechaFormateada, estadoAire: true});
});

apagarAire.addEventListener('click', function(event){
    event.preventDefault();
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    socket.emit('insertarTemperatura', {actual: parseInt(temperaturaActual.textContent), maxima: parseInt(temperaturaMaxima.textContent), minima: parseInt(temperaturaMinima.textContent),fecha: fechaFormateada, estadoAire: false})
    socket.emit('insertarEventoReciente', {evento: 'El usuario ha apagado el aire',fecha: fechaFormateada});
    socket.emit('actuadorTemperaturaModificado', {actual: parseInt(temperaturaActual.textContent), maxima: parseInt(temperaturaMaxima.textContent), minima: parseInt(temperaturaMinima.textContent),fecha: fechaFormateada, estadoAire: false});
});

//Manejamos los eventos de los botones al dar click para subir y bajar temperatura actual, temperatura máxima, temperatura mínima
document.getElementById('aumentar-temperatura').addEventListener('click', function(event){
    event.preventDefault();
    modificarTemperaturaActual(true);
});
document.getElementById('disminuir-temperatura').addEventListener('click', function(event){
    event.preventDefault();
    modificarTemperaturaActual(false);
});

document.getElementById('aumentar-temperatura-maxima').addEventListener('click', function(event){
    event.preventDefault();
    modificarTemperaturaMaxima(true);
});
document.getElementById('disminuir-temperatura-maxima').addEventListener('click', function(event){
    event.preventDefault();
    modificarTemperaturaMaxima(false);
});

document.getElementById('aumentar-temperatura-minima').addEventListener('click', function(event){
    event.preventDefault();
    modificarTemperaturaMinima(true);
});

document.getElementById('disminuir-temperatura-minima').addEventListener('click', function(event){
    event.preventDefault();
    modificarTemperaturaMinima(false);
});

const  serviceURL = 'http://localhost:8080';
const  socket = io.connect(serviceURL);

socket.on('obtenerTemperatura', (data) => {
    actualizarValores(temperaturaActual,temperaturaMaxima, temperaturaMinima, data, 'º');
    console.log(data);
});

socket.on('obtenerActuadorTemperatura', (data) => {
    modificarEstadoAire(data);
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});