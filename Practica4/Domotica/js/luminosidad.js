const luminosidadActual = document.getElementById('luminosidad-actual');
const luminosidadMaxima = document.getElementById('luminosidad-maxima');
const luminosidadMinima = document.getElementById('luminosidad-minima');

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

function actualizarLuminosidad(data){
    luminosidadActual.textContent = data.actual+ 'lx';
    luminosidadMaxima.textContent = data.maxima+ 'lx';
    luminosidadMinima.textContent = data.minima+ 'lx';
}

const variacion = 50;

function aumentarLuminosidad(){
    event.preventDefault();
    let luminosidadA = parseInt(luminosidadActual.textContent);
    let luminosidadNueva = luminosidadA + variacion;
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    socket.emit('insertarLuminosidad', {actual: luminosidadNueva, maxima: parseInt(luminosidadMaxima.textContent), minima: parseInt(luminosidadMinima.textContent),fecha: fechaFormateada});
    socket.emit('insertarEventoReciente', {evento: 'Se ha incrementado la luminosidad en '+variacion+'lx',fecha: fechaFormateada});
    actualizarLuminosidad({actual: luminosidadNueva, maxima: parseInt(luminosidadMaxima.textContent), minima: parseInt(luminosidadMinima.textContent)});
};
function disminuirLuminosidad(){
    event.preventDefault();
    let luminosidadA = parseInt(luminosidadActual.textContent);
    let luminosidadNueva = luminosidadA - variacion;
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    socket.emit('insertarLuminosidad', {actual: luminosidadNueva, maxima: parseInt(luminosidadMaxima.textContent), minima: parseInt(luminosidadMinima.textContent),fecha: fechaFormateada});
    socket.emit('insertarEventoReciente', {evento: 'Se ha decrementado la luminosidad en '+variacion+'lx',fecha: fechaFormateada});
    actualizarLuminosidad({actual: luminosidadNueva, maxima: parseInt(luminosidadMaxima.textContent), minima: parseInt(luminosidadMinima.textContent)});
};

//Manejamos los eventos de los botones al dar click para subir y bajar temperatura
document.getElementById('aumentar-luminosidad').addEventListener('click', aumentarLuminosidad);
document.getElementById('disminuir-luminosidad').addEventListener('click', disminuirLuminosidad);

const  serviceURL = 'http://localhost:8080';
const  socket = io.connect(serviceURL);

socket.on('obtenerLuminosidad', (data) => {
    console.log('Luminosidad Actual: ', data.actual);
    console.log('Luminosidad Máxima: ', data.maxima);
    console.log('Luminosidad Minima: ', data.minima);
    actualizarLuminosidad(data);
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});