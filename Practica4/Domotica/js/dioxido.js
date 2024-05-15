const dioxidoActual = document.getElementById('dioxido-actual');
const dioxidoMaximo = document.getElementById('dioxido-maximo');
const dioxidoMinimo = document.getElementById('dioxido-minimo');

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

function actualizarDioxido(data){
    dioxidoActual.textContent = data.actual + 'ppm';
    dioxidoMinimo.textContent = data.minimo + 'ppm';
    dioxidoMaximo.textContent = data.maximo + 'ppm';
}

const variacion = 50;

function aumentarDioxido(){
    event.preventDefault();
    let dioxidoA = parseInt(dioxidoActual.textContent);
    let dioxidoNuevo = dioxidoA + variacion;
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    socket.emit('insertarDioxido', {actual: dioxidoNuevo, maximo: parseInt(dioxidoMaximo.textContent), minimo: parseInt(dioxidoMinimo.textContent), fecha: fechaFormateada});
    socket.emit('insertarEventoReciente', {evento: 'Se ha incrementado el dioxido de carbono en '+variacion+'ppm',fecha: fechaFormateada});
    actualizarDioxido({actual: dioxidoNuevo, maximo: parseInt(dioxidoMaximo.textContent), minimo: parseInt(dioxidoMinimo.textContent)});
};

function disminuirDioxido(){
    event.preventDefault();
    let dioxidoA = parseInt(dioxidoActual.textContent);
    let dioxidoNuevo = dioxidoA - variacion;
    let fecha = new Date();
    let fechaFormateada = formatearFecha(fecha);
    socket.emit('insertarDioxido', {actual: dioxidoNuevo, maximo: parseInt(dioxidoMaximo.textContent), minimo: parseInt(dioxidoMinimo.textContent), fecha: fechaFormateada});
    socket.emit('insertarEventoReciente', {evento: 'Se ha decrementado el dioxido de carbono en '+variacion+'ppm',fecha: fechaFormateada});
    actualizarDioxido({actual: dioxidoNuevo, maximo: parseInt(dioxidoMaximo.textContent), minimo: parseInt(dioxidoMinimo.textContent)});
};

//Manejamos los eventos de los botones al dar click para subir y bajar temperatura
document.getElementById('aumentar-dioxido').addEventListener('click', aumentarDioxido);
document.getElementById('disminuir-dioxido').addEventListener('click', disminuirDioxido);

const  serviceURL = 'http://localhost:8080';
const  socket = io.connect(serviceURL);

socket.on('obtenerDioxido', (data) => {
    console.log('Dioxido Actual: ', data.actual);
    console.log('Dioxido Máximo: ', data.maximo);
    console.log('Dioxido Minimo: ', data.minimo);
    actualizarDioxido(data);
});

socket.on('disconnect', () => {
    console.log('Desconectado del servidor');
});