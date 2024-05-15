const temperaturaActual = document.getElementById('temperatura-actual');
const temperaturaMaxima = document.getElementById('temperatura-maxima');
const temperaturaMinima = document.getElementById('temperatura-minima');

function formatearFecha(fecha){
    let dia = fecha.getDate().toString().padStart(2, '0');
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0'); // Los meses en JavaScript van de 0 a 11
    let año = fecha.getFullYear();

    let horas = fecha.getHours().toString().padStart(2, '0');
    let minutos = fecha.getMinutes().toString().padStart(2, '0');
    let segundos = fecha.getSeconds().toString().padStart(2, '0');

    let fechaFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
    return fechaFormateada;
}

function actualizarTemperatura(data){
    temperaturaActual.textContent = data.actual + 'º';
    temperaturaMaxima.textContent = data.maxima + 'º';
    temperaturaMinima.textContent = data.minima + 'º';
}

const variacion = 1;

function aumentarTemperatura(){
    event.preventDefault();
    let temperaturaA = parseInt(temperaturaActual.textContent);
    let temperaturaNueva = temperaturaA + variacion;
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    socket.emit('insertarTemperatura', {actual: temperaturaNueva, maxima: parseInt(temperaturaMaxima.textContent), minima: parseInt(temperaturaMinima.textContent), fecha: fechaFormateada});
    socket.emit('insertarEventoReciente', {evento: 'Se ha incrementado la temperatura en '+variacion+'º',fecha: fechaFormateada});
    actualizarTemperatura({actual: temperaturaNueva, maxima: parseInt(temperaturaMaxima.textContent), minima: parseInt(temperaturaMinima.textContent)});
};

function disminuirTemperatura(){
    event.preventDefault();
    let temperaturaA = parseInt(temperaturaActual.textContent);
    let temperaturaNueva = temperaturaA - variacion;
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    socket.emit('insertarTemperatura', {actual: temperaturaNueva, maxima: parseInt(temperaturaMaxima.textContent), minima: parseInt(temperaturaMinima.textContent), fecha: fechaFormateada});
    socket.emit('insertarEventoReciente', {evento: 'Se ha decrementado la temperatura en '+variacion+'º',fecha: fechaFormateada});
    actualizarTemperatura({actual: temperaturaNueva, maxima: parseInt(temperaturaMaxima.textContent), minima: parseInt(temperaturaMinima.textContent)});
};

//Manejamos los eventos de los botones al dar click para subir y bajar temperatura
document.getElementById('aumentar-temperatura').addEventListener('click', aumentarTemperatura);
document.getElementById('disminuir-temperatura').addEventListener('click', disminuirTemperatura);

const  serviceURL = 'http://localhost:8080';
const  socket = io.connect(serviceURL);

socket.on('obtenerTemperatura', (data) => {
    console.log('Temperatura Actual: ', data.actual);
    console.log('Temperatura Máxima: ', data.maxima);
    console.log('Temperatura Minima: ', data.minima);
    actualizarTemperatura(data);
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});