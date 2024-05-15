//Resetear el servidor con cada cambio es node --watch calculadora-web.js o nodemon calculadora-web.js
//npm install nodemon -D(Forma correcta como desarrollador)
import http         from 'node:http';
import {join}       from 'node:path';
import {readFile}   from 'node:fs';

function calcular(operacion, val1, val2) {
    if (operacion == 'sumar') return val1+val2;
    else if (operacion == 'restar') return val1-val2;
    else if (operacion == 'producto') return val1*val2;
    else if (operacion == 'dividir') return val1/val2;
    else return 'Error: Parámetros no válidos';
}

//Función que procesa las peticiones
const processRequest = (request, response) => {
    let {method,url} = request;
    if(url == '/') {//Localhost
        url = '/calc.html';
        const filename = join(process.cwd(), url);

        readFile(filename, (err, data) => {
            //Data es un buffer de datos binarios
            if(!err) {
                response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
                //CABECERAS:    
                    //STATUS CODE:
                    //Status 100-199:Respuestas informativas
                    //Status 200-299:Respuestas satisfactorias
                    //Status 300-399:Redirecciones
                    //Status 400-499:Errores del cliente(Cuando el cliente hace algo mal)
                    //Status 500-599:Errores del servidor(Cuando el servidor hace algo mal)
                    //http.cat Errores explicados
                    //Mas Importante: 200(OK), 301(Moved Permanently), 400(Bad Request), 404(Not Found), 500(Internal Server Error)
                    //mdn.io/http-status-codes

                //IMAGENES
                    //Content-Type: image/*
                    //response.setHeader('Content-Type', 'image/png');
                    //response.end(data);
                response.write(data);
            } else {
                response.writeHead(500, {"Content-Type": "text/plain"});
                response.write(`Error en la lectura del fichero: ${url}`)
            }
            response.end();
        });
    }else if (url == '/Contacto') {//Gestiono cada ruta de url de forma distinta
        response.writeHead(200, {'Content-Type': 'text/plain; charset=utf-8'});
        response.write('Hola, soy el contacto');
        response.end();
    }
    else {//No existe la ruta pasado por el cliente
        url = url.slice(1);
        const params = url.split('/');
        let output='';
        if (params.length >= 3) {
            const val1 = parseFloat(params[1]);
            const val2 = parseFloat(params[2]);
            const result = calcular(params[0], val1, val2);
            output = result.toString();
        }
        else output = 'Error: El número de parámetros no es válido'
        
        response.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        response.write(output);
        response.end();
    }
    //MÉTODO POST
    let body = '';
    //Escuchar el evento data
    request.on('data', chunk => {
        body+=chunk.toString();
    });

    //Escuchar el evento end cuando acaba de leer todos los chunks
    request.on('end', () => {
        console.log(body);
        //LLamar a una base de datos para guardar la info
    });
}

//Creo el servidor
const server = http.createServer(processRequest);

//Selecciono el puerto donde se escucharán las peticiones
server.listen(8080, () => {
    console.log('Servicio HTTP iniciado http://localhost:8080/');
});

