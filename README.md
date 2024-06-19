# Desarrollo de Sistemas Distribuidos

A lo largo de esta asignatura se han llevado a cabo tres prácticas diferentes:

## 1. Desarrollo de dos calculadoras diferentes mediante uso de llamadas a procedimientos remotos

### 1.1 RPC (Remote Procedure Call)
Implementación de una calculadora utilizando la tecnología RPC.

### 1.2 THRIFT
Implementación de una calculadora utilizando la tecnología THRIFT.

## 2. Desarrollo de sistema de donaciones mediante uso de objetos remotos usando la tecnología Java RMI (Remote Method Interface)

Se ha desarrollado un sistema de donaciones que utiliza dos réplicas, implementando dos interfaces: una para el usuario y otra para los servidores.

## 3. Desarrollo de simulación de Sistema Domótico usando Node.js

El desarrollo de esta práctica ha consistido en implementar un sistema domótico haciendo uso de NodeJS y distintos paquetes que tenemos npm. Se ha de suponer un sistema domótico básico compuesto de tres sensores (luminosidad, temperatura y dioxido de carbono), tres actuadores (motor persiana, sistema de Aire/Acondicionado y filtro de dioxido de carbono), un servidor que sirve páginas para mostrar el estado y actuar sobre los elementos de la vivienda. Además dicho servidor incluye un agente capaz de notificar alarmas y tomar decisiones básicas. Como parte extra también se le ha añadido un  BOT de Telegram para recibir tanto mensajes de actualización de los actuadores, como poder pedirle información del estado actual de cualquiera de los sensores, mostrando dicha información el valor actual, máximo y mínimo, además del estado de su actuador en el momento que se solicita.

### Instalación y uso de servidor NodeJS

Para ejecutar el proyecto, sigue estos pasos:

1. Clona el repositorio:
    ```sh
    git@github.com:daviidserranoo07/Desarrollo-de-Sistemas-Distribuidos.git
    ```
2. Instala las dependencias:
    ```sh
    cd tu-repositorio
    npm install
    ```
3. Inicia el servidor:
    ```sh
    node server.js
    ```
## Contacto
Para más información, puedes contactar a David Serrano Domínguez en davidserrano07@correo.ugr.es

