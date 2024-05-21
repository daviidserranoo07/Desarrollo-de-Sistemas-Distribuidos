import http from 'node:http';
import {Server} from 'socket.io';
import {join} from 'node:path';
import {readFile} from 'node:fs';
import { MongoClient } from 'mongodb';
import { Telegraf } from 'telegraf'

const bot = new Telegraf('7103064786:AAFf7K9J9tZsyTJsEPESKeI6-VevRZDKnBA');

// Manejadores de comandos
let userId;

bot.start((ctx) => {
    console.log('/start command received');
    userId = ctx.message.from.id
    ctx.reply('Bienvenido al bot de domótica use el comando /help para ver los comandos disponibles');
});

bot.help((ctx) => {
    console.log('/help command received');
    userId = ctx.message.from.id;
    console.log('User ID: ', userId);
    ctx.reply('Comandos disponibles:\n\n/start - Iniciar el bot\n/help - Mostrar ayuda\n/temperatura - Obtener la temperatura actual\n/luminosidad - Obtener la luminosidad actual\n/dioxido - Obtener el nivel de dióxido de carbono actual');
});

// Lanzar el bot
bot.launch().then(() => {
    console.log('Bot launched');
});

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));

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
                case '/js/funciones.js':
                    leerArchivoJs(url,res);
                    break;
                case '/js/luminosidad.js':
                    leerArchivoJs(url,res);
                    break;
                case '/js/dioxido.js':
                    leerArchivoJs(url,res);
                    break;
                case '/agente.js':
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
    const collectionDioxido = dbo.collection("dioxido")
    const collectionLastsEvents = dbo.collection("ultimosEventos");

    bot.command('temperatura', (ctx) => {
        collectionTemperatura.find().sort({ $natural: -1 }).limit(1).toArray().then((data) => { 
            if (data.length > 0) {  
                    console.log('/temperatura command received');
                    let aire = 'APAGADO';
                    if(data[0].estadoAire)  aire = 'ENCENDIDO';
                    userId = ctx.message.from.id;
                    console.log('User ID: ', userId);
                    ctx.reply(
                        'La temperatura máxima es de ' + data[0].maxima + '°C' +
                        '\nLa temperatura actual es de ' + data[0].actual + '°C' +
                        '\nLa temperatura minima es de ' + data[0].minima + '°C' +
                        '\nEl estado del aire acondicionado es ' + aire
                    );            
            }
        }).catch((error) => {
            console.error("Error obteniendo la temperatura: ", error);
        });
    });

    bot.command('luminosidad', (ctx) => {
        collectionLuminosidad.find().sort({ $natural: -1 }).limit(1).toArray().then((data) => { 
            if (data.length > 0) {
                    console.log('/luminosidad command received');
                    let persiana = 'CERRADA';
                    if(data[0].estadoPersiana)  persiana = 'SUBIDA';
                    userId = ctx.message.from.id;
                    console.log('User ID: ', userId);
                    ctx.reply(
                        'La luminosidad máxima es de ' + data[0].maxima + '°C' +
                        '\nLa luminosidad actual es de ' + data[0].actual + '°C' +
                        '\nLa luminosidad minima es de ' + data[0].minima + '°C' +
                        '\nEl estado de la persiana es ' + persiana
                    );   
            }
        }).catch((error) => {
            console.error("Error obteniendo la luminosidad: ", error);
        });
    }); 

    bot.command('dioxido', (ctx) => {
        collectionDioxido.find().sort({ $natural: -1 }).limit(1).toArray().then((data) => { 
            if (data.length > 0) {
                    console.log('/dioxido command received');
                    let filtro = 'APAGADO';
                    if(data[0].estadoFiltroDioxido)  filtro = 'ENCENDIDO';
                    userId = ctx.message.from.id;
                    console.log('User ID: ', userId);
                    ctx.reply(
                        'El dioxido máximo es de ' + data[0].maxima + '°C' +
                        '\nEl dioxido actual es de ' + data[0].actual + '°C' +
                        '\nEl dioxido minimo es de ' + data[0].minima + '°C' +
                        '\nEl estado del filtro de dioxido de carbono es ' + filtro
                    );  
            }
        }).catch((error) => {
            console.error("Error obteniendo el dioxido: ", error);
        });
    });  

    //Creamos el servidor de WebSockets
    const io = new Server(server);
    io.on('connection', (client) => {
        console.log('Se ha conectado un cliente');

        //io.emit('dioxido', {actual: 600, maxima: 1000, minima: 400, fecha: new Date()});

        //Obtén el último valor de temperatura de la base de datos y emítelo
        collectionTemperatura.find().sort({ $natural: -1 }).limit(1).toArray().then((data) => { 
            if (data.length > 0) {
                // Emitir los datos más recientes de la base de datos (último registro)
                client.emit('obtenerTemperatura', data[0]);
                client.emit('obtenerActuadorTemperatura', data[0]);
            }
        }).catch((error) => {
            console.error("Error obteniendo la temperatura: ", error);
        });

        //Obtén el último valor de la luminosidad de la base de datos y emítelo
        collectionLuminosidad.find().sort({ $natural: -1 }).limit(1).toArray().then((data) => { 
            if (data.length > 0) {
                // Emitir los datos más recientes de la base de datos (último registro)
                client.emit('obtenerLuminosidad', data[0]);
                client.emit('obtenerActuadorLuminosidad', data[0]);
            }
        }).catch((error) => {
            console.error("Error obteniendo la luminosidad: ", error);
        });

        collectionDioxido.find().sort({ $natural: -1 }).limit(1).toArray().then((data) => { 
            if (data.length > 0) {
                // Emitir los datos más recientes de la base de datos (último registro)
                client.emit('obtenerDioxido', data[0]);
                client.emit('obtenerActuadorFiltroDioxido', data[0]);
            }
        }).catch((error) => {
            console.error("Error obteniendo el dioxido: ", error);
        });

        collectionLastsEvents.find().sort({ $natural: -1 }).limit(10).toArray().then((data) => { 
            if (data.length > 0) {
                // Emitir los datos más recientes de la base de datos (último registro)
                client.emit('obtenerEventosRecientes', data);
            }
        }).catch((error) => {
            console.error("Error obteniendo eventos recientes: ", error);
        });
        

        client.on('insertarTemperatura', (data) => {
            collectionTemperatura.insertOne(data).then(() => {
                //console.log(data);
                io.emit('obtenerTemperatura', data);
            }).catch((error) => {
                console.error("Error insertando la temperatura en la base de datos: ", error);
            });
        });

        client.on('insertarLuminosidad', (data) => {
            collectionLuminosidad.insertOne(data).then(() => {
                //console.log(data);
                io.emit('obtenerLuminosidad', data);
            }).catch((error) => {
                console.error("Error insertando la luminosidad en la base de datos: ", error);
            });
        });

        client.on('insertarDioxido', (data) => {
            collectionDioxido.insertOne(data).then(() => { 
                //console.log(data);    
                io.emit('obtenerDioxido', data);
            }).catch((error) => {
                console.error("Error insertando el dioxido en la base de datos: ", error);
            });
        });

        client.on('insertarEventoReciente', (data) => {
            collectionLastsEvents.insertOne(data).then(() => {
                //console.log(data);
                collectionLastsEvents.find().sort({ $natural: -1 }).limit(10).toArray().then((data) => { 
                    if (data.length > 0) {
                        // Emitir los datos más recientes de la base de datos (último registro)
                        io.emit('obtenerEventosRecientes', data);
                    }
                }).catch((error) => {
                    console.error("Error obteniendo eventos recientes: ", error);
                });
            }).catch((error) => {
                console.error("Error insertando evento reciente en la base de datos: ", error);
            });
        });

        client.on('actuadorTemperaturaModificado', (data) => {
            io.emit('obtenerActuadorTemperatura', data);
            if(data.estadoAire){
                console.log('Estado aire: ', data.estadoAire);
                console.log('Enviando mensaje a: ', userId);
                bot.telegram.sendMessage(userId, '!!!!El aire acondicionado ha sido encendido por alta temperatura¡¡¡¡');
            }
        });

        client.on('actuadorLuminosidadModificado', (data) => {
            io.emit('obtenerActuadorLuminosidad', data);
            console.log('Estado persiana: ', data.estadoPersiana);
            if(data.estadoPersiana){
                console.log('Enviando mensaje a: ', userId);
                bot.telegram.sendMessage(userId, '!!!!La persiana se ha subido por exceso de luz¡¡¡¡');
            }
        });

        client.on('actuadorDioxidoModificado', (data) => {
            io.emit('obtenerActuadorFiltroDioxido', data);
            console.log('Estado filtro: ', data.estadoFiltroDioxido);
            if(data.estadoFiltroDioxido){
                console.log('Enviando mensaje a: ', userId);
                bot.telegram.sendMessage(userId, '!!!!El filtro de dioxido se ha encendido por exceso de dioxido¡¡¡¡');
            }
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
