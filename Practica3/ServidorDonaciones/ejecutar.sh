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
java -cp . -Djava.rmi.server.codebase=file:./ -Djava.rmi.server.hostname=localhost -Djava.security.policy=server.policy Servidor &
sleep 2
echo "Lanzando el Replica"
java -cp . -Djava.rmi.server.codebase=file:./ -Djava.rmi.server.hostname=localhost -Djava.security.policy=server.policy Replica &
sleep 2
echo
echo "Lanzando Cliente"
echo
java -cp . -Djava.security.policy=server.policy Cliente localhost
# sleep 2
# echo
# echo "Lanzando cliente"
# echo
# java -cp . -Djava.security.policy=server.policy Cliente localhost 3