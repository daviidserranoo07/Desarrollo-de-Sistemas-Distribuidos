export function formatearFecha(fecha){
    let dia = fecha.getDate().toString().padStart(2, '0');
    let mes = (fecha.getMonth() + 1).toString().padStart(2, '0');
    let año = fecha.getFullYear();

    let horas = fecha.getHours().toString().padStart(2, '0');
    let minutos = fecha.getMinutes().toString().padStart(2, '0');
    let segundos = fecha.getSeconds().toString().padStart(2, '0');

    let fechaFormateada = `${dia}/${mes}/${año} ${horas}:${minutos}:${segundos}`;
    return fechaFormateada;
}

export const luminosidadActual = document.getElementById('luminosidad-actual');
export const luminosidadMaxima = document.getElementById('luminosidad-maxima');
export const luminosidadMinima = document.getElementById('luminosidad-minima');
export const persiana = document.getElementById('estado-persiana');

export const temperaturaActual = document.getElementById('temperatura-actual');
export const temperaturaMaxima = document.getElementById('temperatura-maxima');
export const temperaturaMinima = document.getElementById('temperatura-minima');
export const aireAcondicionado = document.getElementById('estado-aire');

export const dioxidoActual = document.getElementById('dioxido-actual');
export const dioxidoMaximo = document.getElementById('dioxido-maximo');
export const dioxidoMinimo = document.getElementById('dioxido-minimo');
export const filtroDioxido = document.getElementById('estado-filtro');

export const encenderAire = document.getElementById('encender-aire');
export const apagarAire = document.getElementById('apagar-aire');
export const subirPersiana = document.getElementById('subir-persiana');
export const bajarPersiana = document.getElementById('bajar-persiana');
export const encenderFiltro = document.getElementById('encender-filtro');
export const apagarFiltro = document.getElementById('apagar-filtro');

export function actualizarValores(actual,maxima,minima,data,simbolo){
    actual.textContent = data.actual + simbolo;
    maxima.textContent = data.maxima + simbolo;
    minima.textContent = data.minima + simbolo;
}

export function modificarEstadoPersiana(data){
    console.log(data.estadoPersiana);
    if(data.estadoPersiana){
        persiana.classList.remove('apagado');
        persiana.classList.add('encendido');
        persiana.textContent = 'Subida';
    }else{
        persiana.classList.remove('encendido');
        persiana.classList.add('apagado');
        persiana.textContent = 'Bajada';
    }
}

export function modificarEstadoAire(data){
    if(data.estadoAire){
        aireAcondicionado.classList.remove('apagado');
        aireAcondicionado.classList.add('encendido');
        aireAcondicionado.textContent = 'Encendido';
    }else{
        aireAcondicionado.classList.remove('encendido');
        aireAcondicionado.classList.add('apagado');
        aireAcondicionado.textContent = 'Apagado';
    }
}

export function modificarEstadoFiltro(data){
    if(data.estadoFiltroDioxido){
        filtroDioxido.classList.remove('apagado');
        filtroDioxido.classList.add('encendido');
        filtroDioxido.textContent = 'Encendido';
    }else{
        filtroDioxido.classList.remove('encendido');
        filtroDioxido.classList.add('apagado');
        filtroDioxido.textContent = 'Apagado';
    }
}