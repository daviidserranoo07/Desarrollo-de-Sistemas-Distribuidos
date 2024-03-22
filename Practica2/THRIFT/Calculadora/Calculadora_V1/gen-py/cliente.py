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

def calculadora(num1,num2,opcion,client):

    if opcion==1:
        resultado=client.suma(num1,num2)
        print("Resultado de la suma es: "+ str(resultado))
    elif opcion==2:
        resultado=client.resta(num1,num2)
        print("Resultado de la resta es: "+ str(resultado))
    elif opcion==3:
        resultado=client.multiplicacion(num1,num2)
        print("Resultado de la multiplicación es: "+ str(resultado))
    elif opcion==4:
        resultado=client.division(num1,num2)
        if resultado==-1:
            print("Error: No se puede dividir por cero.")
        else:
            print("Resultado de la división es: "+ str(resultado))
    elif opcion==5:
        resultado=client.sen(num1)
        print("Resultado del sen("+num1+") es: "+ str(resultado))
    elif opcion==6:
        resultado=client.cos(num1)
        print("Resultado del cos("+num1+") es: "+ str(resultado))
    elif opcion==7:
        resultado=client.tangente(num1)
        print("Resultado del tg("+num1+") es: "+ str(resultado))
    elif opcion==8:
        resultado=client.grados_radianes(num1)
        print("El valor de ("+num1+") grados son: "+ str(resultado)+" radianes")
    elif opcion==9:
        resultado=client.radianes_grados(num1)
        print("El radianes de ("+num1+") grados son: "+ str(resultado)+" grados")
    # elif opcion==10:
    # elif opcion==11:
    # elif opcion==12:
    # elif opcion==13:
    # elif opcion==14:
    # elif opcion==15:
    # elif opcion==16:
    # elif opcion==17:
    
    return resultado

def main():
    transport = TSocket.TSocket("localhost", 9090)
    transport = TTransport.TBufferedTransport(transport)
    protocol = TBinaryProtocol.TBinaryProtocol(transport)

    client = Calculadora.Client(protocol)

    transport.open()
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
                num1 = float(input("Introduzca el número 1: "))
                num2 = float(input("Introduzca el numero 2: "))
                calculadora(num1,num2,opcion,client)
            elif tipo==2:
                if opcion<9:
                    valor = float(input("Introduzca los grados: "))
                else: 
                    valor = float(input("Introduzca los radianes: "))
                num2 = None
                calculadora(valor,num2,opcion,client)
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