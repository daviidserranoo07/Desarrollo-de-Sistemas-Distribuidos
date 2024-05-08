#!/bin/sh -e
# ejecutar = Macro para compilación y ejecución del programa ejemplo
# en una sola maquina Unix de nombre localhost.
echo
echo "Lanzando el ligador de RMI … "
rmiregistry &
echo
echo "Compilando con javac ..."
javac *.java
sleep 2
echo
echo "Lanzando el Servidor"
java -cp . -Djava.rmi.server.codebase=file:./ -Djava.rmi.server.hostname=localhost -Djava.security.policy=server.policy Servidor servidor replica 1&
sleep 2
echo "Lanzando la Replica"
java -cp . -Djava.rmi.server.codebase=file:./ -Djava.rmi.server.hostname=localhost -Djava.security.policy=server.policy Servidor replica servidor 2&
sleep 2
echo
echo "Lanzando Cliente"
echo
java -cp . -Djava.security.policy=server.policy Cliente localhost 1 David 1234
# sleep 2
# echo
# echo "Lanzando cliente"
# echo
# java -cp . -Djava.security.policy=server.policy Cliente localhost 3