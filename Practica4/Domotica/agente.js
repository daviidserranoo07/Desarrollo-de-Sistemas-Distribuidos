import {io} from "socket.io-client";
const  serviceURL = 'http://localhost:8080?tipo=agente';
const  socket = io.connect(serviceURL);

//Variables para controlar los valores de los sensores y modificar los actuadores
var MAX_TEMPERATURA;
var MIN_TEMPERATURA;

var MAX_LUMINOSIDAD;
var MIN_LUMINOSIDAD;

var MAX_DIOXIDO;
var MIN_DIOXIDO;

function formatearFecha(fecha){
    let dia = fecha.getDate().toString().padStart(2, '0');
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    let año = fecha.getFullYear();

    let horas = fecha.getHours().toString().padStart(2, '0');
    let minutos = fecha.getMinutes().toString().padStart(2, '0');
    let segundos = fecha.getSeconds().toString().padStart(2, '0');

    let fechaFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
    return fechaFormateada;
}

function comprobarActuadorAire(data){
    var modificado = false;
    MAX_TEMPERATURA = data.maxima;
    MIN_TEMPERATURA = data.minima;
    //console.log('Data: ',data);
    if(data.actual > MAX_TEMPERATURA && data.estadoAire == false){
        data.estadoAire = true;
        modificado = true;
    }else if(data.actual < MIN_TEMPERATURA && data.estadoAire == true){
        data.estadoAire = false;
        modificado = true;
    }
    return {data: data,modificado: modificado};
}

function comprobarActuadorPersiana(data){
    var modificado = false;
    MAX_LUMINOSIDAD = data.maxima;
    MIN_LUMINOSIDAD = data.minima;
    if(data.actual > MAX_LUMINOSIDAD && data.estadoPersiana == true){
        data.estadoPersiana = false;
        modificado = true;
        
    }else if(data.actual < MIN_LUMINOSIDAD && data.estadoPersiana == false){
        data.estadoPersiana = true;
        modificado = true;
    }
    return {data: data,modificado: modificado};
}

function comprobarActuadorFiltroDioxido(data){
    var modificado = false;
    MAX_DIOXIDO = data.maxima;
    MIN_DIOXIDO = data.minima;
    if(data.actual > MAX_DIOXIDO && data.estadoFiltroDioxido == false){
        data.estadoFiltroDioxido = true;
        modificado = true;
    }else if(data.actual < MIN_DIOXIDO && data.estadoFiltroDioxido == true){
        data.estadoFiltroDioxido = false;
        modificado = true;
    }
    return {data: data,modificado: modificado};
}

socket.on('obtenerTemperatura', (data) => {
    let resultado = comprobarActuadorAire(data);
    if(resultado.modificado){
        let newData = resultado.data;
        socket.emit('insertarTemperatura', newData);
        socket.emit('actuadorTemperaturaModificado',newData);
        if(newData.estadoAire){
            let fecha = new Date();
            let fechaFormateada = formatearFecha(fecha);
            socket.emit('insertarEventoReciente', {evento: 'Se ha encendido el aire por alta temperatura',fecha: fechaFormateada});
        }else{
            let fecha = new Date();
            let fechaFormateada = formatearFecha(fecha);
            socket.emit('insertarEventoReciente', {evento: 'Se ha apagado el aire por baja temperatura',fecha: fechaFormateada});
        }        
    }
});

socket.on('obtenerLuminosidad', (data) => {
    let resultado = comprobarActuadorPersiana(data);
    if(resultado.modificado){
        //console.log('Resultado: ',resultado.modificado);
        let newData = resultado.data;
        socket.emit('insertarLuminosidad', newData);
        socket.emit('actuadorLuminosidadModificado',newData);
        if(newData.estadoPersiana){
            let fecha = new Date();
            let fechaFormateada = formatearFecha(fecha);
            socket.emit('insertarEventoReciente', {evento: 'Se ha subido la persiana por falta de luz',fecha: fechaFormateada});
        }else{
            let fecha = new Date();
            let fechaFormateada = formatearFecha(fecha);
            socket.emit('insertarEventoReciente', {evento: 'Se ha bajado la persiana por exceso de luz',fecha: fechaFormateada});
        }
    }
});

socket.on('obtenerDioxido', (data) => {
    let resultado = comprobarActuadorFiltroDioxido(data);
    //console.log('Resultado: ',resultado);
    if(resultado.modificado){
        let newData = resultado.data;
        socket.emit('insertarDioxido', newData);
        socket.emit('actuadorDioxidoModificado',newData);
        if(newData.estadoFiltroDioxido){
            let fecha = new Date();
            let fechaFormateada = formatearFecha(fecha);
            socket.emit('insertarEventoReciente', {evento: 'Se ha encendido el filtro por exceso de dioxido de carbono',fecha: fechaFormateada});
        }else{
            let fecha = new Date();
            let fechaFormateada = formatearFecha(fecha);
            socket.emit('insertarEventoReciente', {evento: 'Se ha apagado el filtro por bajo de dioxido de carbono',fecha: fechaFormateada});
        }
    }
});
