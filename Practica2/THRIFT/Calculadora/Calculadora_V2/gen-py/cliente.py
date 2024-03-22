from calculadora import Calculadora

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol

import math

def menu():
    while True:
        print("\n\nBienvenido a la calculadora introduzca la operación que desea realizar:"
				"\n ------------OPERACIONES BÁSICAS(MÁXIMO 100 NÚMEROS)------------"
		   		"\n 1.Introduzca 1 para realizar una suma."
				"\n 2.Introduzca 2 para realizar una resta."
				"\n 3.Introduzca 3 para realizar una multiplicación."
				"\n 4.Introduzca 4 para realizar una división."
                "\n ------------OPERACIONES TRIGONOMÉTRICAS------------"
                "\n 5.Introduzca 5 para calcular el sen()."
                "\n 6.Introduzca 6 para calcular el cos()."
                "\n 7.Introduzca 7 para rcalcular tg()."
                "\n 8.Introduzca 8 para pasar de grados a radianes."
                "\n 9.Introduzca 9 para pasar de radianes a grados."
				"\n\n ------------OPERACIONES CON VECTORES(TAMAÑO MÁXIMO 100)------------"
				"\n 10.Introduzca 10 para sumar componentes de 2 vectores"
				"\n 11.Introduzca 11 para restar componentes de 2 vectores"
				"\n 12.Introduzca 12 para multiplicar componentes de 2 vectores"
				"\n 13.Introduzca 13 para dividir componentes de 2 vectores"
				"\n\n ------------OPERACIONES CON MATRICES CUADRADAS(MÁXIMO 5X5)------------"
				"\n 14.Introduzca 14 para sumar 2 matrices cuadradas"
				"\n 15.Introduzca 15 para restar 2 matrices cuadrada"
				"\n 16.Introduzca 16 para multiplicar 2 matrices(NO TIENE PORQUE SER CUADRADAS)"
				"\n 17.Introduzca 17 para calcular determinante de una matriz(MÁXIMO MATRICES DE 3x3)"
				"\n 18.Introduzca 18 para salir\n")
        opcion = int(input("Introduzca la operacion a realizar: "))
        if opcion<=18 and opcion>=1: 
            break

    return opcion

def calculadoraBasica(numeros,opcion,client):

    if opcion==1:
        resultado=client.suma(numeros)
        print("Resultado de la suma es: "+ str(resultado))
    elif opcion==2:
        resultado=client.resta(numeros)
        print("Resultado de la resta es: "+ str(resultado))
    elif opcion==3:
        resultado=client.multiplicacion(numeros)
        print("Resultado de la multiplicación es: "+ str(resultado))
    elif opcion==4:
        resultado=client.division(numeros)
        if resultado==-1:
            print("Error: No se puede dividir por cero.")
        else:
            print("Resultado de la división es: "+ str(resultado))

def calculadoraTrigonometrica(num,opcion,client):
    if opcion==5:
        resultado=client.sen(num)
        print("Resultado del sen("+num+") es: "+ str(resultado))
    elif opcion==6:
        resultado=client.cos(num)
        print("Resultado del cos("+num+") es: "+ str(resultado))
    elif opcion==7:
        resultado=client.tangente(num)
        print("Resultado del tg("+num+") es: "+ str(resultado))
    elif opcion==8:
        resultado=client.grados_radianes(num)
        print("El valor de ("+num+") grados son: "+ str(resultado)+" radianes")
    elif opcion==9:
        resultado=client.radianes_grados(num)
        print("El radianes de ("+num+") grados son: "+ str(resultado)+" grados")

def calculadoraVectores(vector1,vector2,opcion,cliente):
    # if opcion==10:
    # elif opcion==11:
    # elif opcion==12:
    # elif opcion==13:
    return

def calculadoraMatrices(matriz1,matriz2,opcion,cliente):
    # if opcion==14:
    # elif opcion==15:
    # elif opcion==16:
    # elif opcion==17:
    return

def main():
    transport = TSocket.TSocket("localhost", 9090)
    transport = TTransport.TBufferedTransport(transport)
    protocol = TBinaryProtocol.TBinaryProtocol(transport)

    client = Calculadora.Client(protocol)

    transport.open()
    numeros=list()
    while True:
        opcion = menu()
        if opcion != 18:
            if opcion<5: tipo=1
            elif opcion<10: tipo=2
            elif opcion<14: tipo=3
            elif opcion<17: tipo=4
            elif opcion==16: tipo=5
            else: tipo=6 

            if tipo==1:
                cantidad = int(input("Introduzca la cantidad de números con los que quiere operar: "))
                if cantidad<=100 and cantidad>=1:
                    numeros.clear()
                    for numero in range(0,cantidad):
                        valor=float(input("Introduzca el número "+str(numero+1)+": "))
                        numeros.append(valor)
                else:
                    print("Esa cantidad no esta permitida.")
                    exit(0)
                calculadoraBasica(numeros,opcion,client)
            elif tipo==2:
                if opcion<9:
                    valor = float(input("Introduzca los grados: "))
                else: 
                    valor = float(input("Introduzca los radianes: "))
                calculadoraTrigonometrica(valor,opcion,client)
            # elif tipo==3:
            # elif tipo==4:
            # elif tipo==5:
            # elif tipo==6:
        continuar=int(input("\nDesea realizar otra operación: "
			                "\n1. Introduzca cualquier número en caso de que si: "
			                "\n2. Introduzca 0 en caso de que no: \n"))
        if continuar==0 or opcion==18:
            break

    # print("Hacemos ping al server")
    # client.ping()

    # resultado = client.suma(1, 1)
    # print("1 + 1 = " + str(resultado))
    # resultado = client.resta(1, 1)
    # print("1 - 1 = " + str(resultado))
    # resultado = client.multiplicacion(1, 1)
    # print("1 * 1 = " + str(resultado))
    # resultado = client.division(1, 1)
    # print("1 / 1 = " + str(resultado))
    # resultado = client.sen(1)
    # print("Sen(1) = " + str(resultado))
    # resultado = client.cos(0)
    # print("Cos(0) = " + str(resultado))
    # resultado = client.tangente(1)
    # print("Tg(1) = " + str(resultado))
    # resultado = client.radianes_grados(2*math.pi)
    # print("Radianes a grados = " + str(resultado))
    # resultado = client.grados_radianes(360)
    # print("Grados a radianes = " + str(resultado))

    transport.close()

if __name__ == "__main__":
    main()