import http from 'node:http';
import {Server} from 'socket.io';
import {join} from 'node:path';
import {readFile} from 'node:fs';
import { MongoClient } from 'mongodb';


function leerArchivoHtml(url,res){
    const filenameHtml = join(process.cwd(), url);//Obtenemos la ruta del archivo index.html
    //Leemos el archivo index.html y se lo devolvemos al cliente que realizó la petición
    readFile(filenameHtml,(err, data) => {
        if(err){//Si hay un error en la lectura del archivo
            res.writeHead(500, {'Content-Type': 'text/plain'}); 
            res.write('500 Error en la lrectura del archivo ${url}');
            res.end();
        }else{
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write(data);
            res.end();
        }
    });
}

function leerArchivoCss(url,res){
    const filenameCss = join(process.cwd(), url);//Obtenemos la ruta del archivo index.html
    //Leemos el archivo index.html y se lo devolvemos al cliente que realizó la petición
    readFile(filenameCss,(err, data) => {
        if(err){//Si hay un error en la lectura del archivo
            res.writeHead(500, {'Content-Type': 'text/plain'}); 
            res.write('500 Error en la lrectura del archivo ${url}');
            res.end();
        }else{
            res.writeHead(200, {'Content-Type': 'text/css'});
            res.write(data);
            res.end();
        }
    });
}

function leerArchivoJs(url,res){
    const filenameCss = join(process.cwd(), url);//Obtenemos la ruta del archivo index.html
    //Leemos el archivo index.html y se lo devolvemos al cliente que realizó la petición
    readFile(filenameCss,(err, data) => {
        if(err){//Si hay un error en la lectura del archivo
            res.writeHead(500, {'Content-Type': 'text/plain'}); 
            res.write('500 Error en la lrectura del archivo ${url}');
            res.end();
        }else{
            res.writeHead(200, {'Content-Type': 'text/javascript'});
            res.write(data);
            res.end();
        }
    });
}

const processRequest = (req, res) => {
    let {method, url} = req;
    //console.log(method, url);
    switch(method){    
        case 'GET':
            switch(url){
                case '/':
                    url = '/templates/index.html';
                    leerArchivoHtml(url,res);
                    break;
                case '/luminosidad.html':
                    url='/templates/luminosidad.html';
                    leerArchivoHtml(url,res);
                    break;
                case '/temperatura.html':
                    url='/templates/temperatura.html';
                    leerArchivoHtml(url,res);
                    break;
                case '/dioxido.html':
                    url='/templates/dioxido.html';
                    leerArchivoHtml(url,res);
                    break;
                case '/style.css':
                    url='/css/style.css';
                    leerArchivoCss(url,res);
                    break;
                case '/css/sensores.css':
                    leerArchivoCss(url,res);
                    break;
                case '/js/informacionGeneral.js':
                    leerArchivoJs(url,res);
                    break;
                case '/js/temperatura.js':
                    leerArchivoJs(url,res);
                    break;
                case '/js/luminosidad.js':
                    leerArchivoJs(url,res);
                    break;
                case '/js/dioxido.js':
                    leerArchivoJs(url,res);
                    break;
                default://Si la ruta no existe pasamos un error 404
                    res.writeHead(404, {'Content-Type': 'text/html; charset=utf-8'});
                    res.write('<h1>404 Not Found<h1>');
                    res.end();
                    break;
            }
            break;
        case 'POST'://Recibimos una petición POST
            res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
            res.write('Petición POST recibida');
            res.end();
            break;
    }   
}

//Creamos el servidor
const server = http.createServer(processRequest);

MongoClient.connect("mongodb://localhost:27017").then((db) => {
    const dbo = db.db("sensores");
    const collectionTemperatura = dbo.collection("temperatura");
    const collectionLuminosidad = dbo.collection("luminosidad");
    const collectionDioxido = dbo.collection("dioxido");
    const collectionLastsEvents = dbo.collection("ultimosEventos");

    //Creamos el servidor de WebSockets
    const io = new Server(server);
    io.on('connection', (client) => {
        console.log('Se ha conectado un cliente');

        // client.emit('temperatura', {actual: 25, maxima: 40, minima: 10});
        // client.emit('luminosidad', {actual: 200, maxima: 400, minima: 100});
        // client.emit('dioxido', {actual: 500, maximo: 1000, minimo: 300});

        //Obtén el último valor de temperatura de la base de datos y emítelo
        collectionTemperatura.find().sort({ $natural: -1 }).limit(1).toArray().then((data) => { 
            if (data.length > 0) {
                // Emitir los datos más recientes de la base de datos (último registro)
                client.emit('obtenerTemperatura', data[0]);
            }
        }).catch((error) => {
            console.error("Error obteniendo la temperatura: ", error);
        });

        //Obtén el último valor de la luminosidad de la base de datos y emítelo
        collectionLuminosidad.find().sort({ $natural: -1 }).limit(1).toArray().then((data) => { 
            if (data.length > 0) {
                // Emitir los datos más recientes de la base de datos (último registro)
                client.emit('obtenerLuminosidad', data[0]);
            }
        }).catch((error) => {
            console.error("Error obteniendo la luminosidad: ", error);
        });

        collectionDioxido.find().sort({ $natural: -1 }).limit(1).toArray().then((data) => { 
            if (data.length > 0) {
                // Emitir los datos más recientes de la base de datos (último registro)
                client.emit('obtenerDioxido', data[0]);
            }
        }).catch((error) => {
            console.error("Error obteniendo el dioxido: ", error);
        });

        collectionLastsEvents.find().sort({ $natural: -1 }).limit(10).toArray().then((data) => { 
            if (data.length > 0) {
                // Emitir los datos más recientes de la base de datos (último registro)
                client.emit('obtenerEventosRecientes', data);
                console.log(data);
            }
        }).catch((error) => {
            console.error("Error obteniendo eventos recientes: ", error);
        });
        

        client.on('insertarTemperatura', (data) => {
            console.log("Temperatura: ", data);
            collectionTemperatura.insertOne(data).then(() => {
                console.log("Temperatura insertada en la base de datos");
                console.log(data);
                io.emit('obtenerTemperatura', data);
            }).catch((error) => {
                console.error("Error insertando la temperatura en la base de datos: ", error);
            });
        });

        client.on('insertarLuminosidad', (data) => {
            console.log("Luminosidad: ", data);
            collectionLuminosidad.insertOne(data).then(() => {
                io.emit('obtenerLuminosidad', data);
            }).catch((error) => {
                console.error("Error insertando la luminosidad en la base de datos: ", error);
            });
        });

        client.on('insertarDioxido', (data) => {
            console.log("Dioxido: ", data);
            collectionDioxido.insertOne(data).then(() => {
                io.emit('obtenerDioxido', data);
            }).catch((error) => {
                console.error("Error insertando el dioxido en la base de datos: ", error);
            });
        });

        client.on('insertarEventoReciente', (data) => {
            //console.log("Evento: ", data);
            collectionLastsEvents.insertOne(data).then(() => {
                console.log("Evento reciente insertado en la base de datos");
                collectionLastsEvents.find().sort({ $natural: -1 }).limit(10).toArray().then((data) => { 
                    if (data.length > 0) {
                        // Emitir los datos más recientes de la base de datos (último registro)
                        io.emit('obtenerEventosRecientes', data);
                        //console.log(data);
                    }
                }).catch((error) => {
                    console.error("Error obteniendo eventos recientes: ", error);
                });
            }).catch((error) => {
                console.error("Error insertando evento reciente en la base de datos: ", error);
            });
        });


        client.on('disconnect', () => {
            console.log('Se ha desconectado un cliente');
        });
    });

}).catch((error) => {console.log(error)});

//Seleccionamos el puerto donde se escucharán las peticiones
server.listen(8080, () => {
  console.log('Server running on http://localhost:8080');
});
