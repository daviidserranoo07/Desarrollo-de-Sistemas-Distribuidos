from calculadora import Calculadora

from thrift import Thrift
from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from calculadora.ttypes import calc_res
from calculadora.ttypes import calc_mat
from calculadora.ttypes import calc_res
from calculadora.ttypes import calc_vec
from calculadora.ttypes import Matrix
from calculadora.ttypes import calc_eu
from calculadora.ttypes import calc_ext_eu


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
				"\n\n ------------OPERACIONES CON MATRICES CUADRADAS------------"
				"\n 14.Introduzca 14 para sumar 2 matrices cuadradas"
				"\n 15.Introduzca 15 para restar 2 matrices cuadrada"
				"\n 16.Introduzca 16 para multiplicar 2 matrices(NO TIENE PORQUE SER CUADRADAS)"
				"\n 17.Introduzca 17 para calcular determinante de una matriz(MÁXIMO MATRICES DE 3x3)"
                "\n\n ------------OPERACIONES ÁLGEBRA------------"
				"\n 18.Introduzca 18 para algoritmo de euclides"
				"\n 19.Introduzca 19 para algoritmo extendido de euclides"
				"\n 20.Introduzca 20 para salir\n")
        opcion = int(input("Introduzca la operacion a realizar: "))
        if opcion<=20 and opcion>=1: 
            break

    return opcion

def calculadoraBasica(numeros,opcion,client):
    resultado = calc_res()
    if opcion==1:
        resultado=client.suma(numeros)
        if resultado.success:
            print("Resultado de la suma es: "+ str(resultado.result))
        else:
            print(resultado.message)
    elif opcion==2:
        resultado=client.resta(numeros)
        if resultado.success:
            print("Resultado de la resta es: "+ str(resultado.result))
        else:
            print(resultado.message)
    elif opcion==3:
        resultado=client.multiplicacion(numeros)
        if resultado.success:
            print("Resultado de la multiplicacion es: "+ str(resultado.result))
        else:
            print(resultado.message)
    elif opcion==4:
        resultado=client.division(numeros)
        if resultado.success:
            print("Resultado de la division es: "+ str(resultado.result))
        else:
            print(resultado.message)

def calculadoraTrigonometrica(num,opcion,client):
    resultado = calc_res()
    if opcion==5:
        resultado=client.sen(num)
        print("Resultado del sen("+str(num)+") es: "+ str(resultado.result))
    elif opcion==6:
        resultado=client.cos(num)
        print("Resultado del cos("+str(num)+") es: "+ str(resultado.result))
    elif opcion==7:
        resultado=client.tangente(num)
        print("Resultado del tg("+str(num)+") es: "+ str(resultado.result))
    elif opcion==8:
        resultado=client.grados_radianes(num)
        print("El valor de ("+str(num)+") grados son: "+ str(resultado.result)+" radianes")
    elif opcion==9:
        resultado=client.radianes_grados(num)
        print("El radianes de ("+str(num)+") grados son: "+ str(resultado.result)+" grados")

def calculadoraVectores(vector1,vector2,opcion,client):
    resultado = calc_vec()
    if opcion==10:
        resultado=client.sumar_vectores(vector1,vector2)
        if resultado.success==True:
            print("El resultado de la suma de vectores es:\n")
            print(resultado.result)
        else:
            print(resultado.message)
    elif opcion==11:
        resultado=client.restar_vectores(vector1,vector2)
        if resultado.success==True:
            print("El resultado de la resta de vectores es:\n")
            print(resultado.result)
        else:
            print(resultado.message)
    elif opcion==12:
        resultado=client.multiplicar_vectores(vector1,vector2)
        if resultado.success==True:
            print("El resultado de la multiplicación de vectores es:\n")
            print(resultado.result)
        else:
            print(resultado.message)
    elif opcion==13:
        resultado=client.dividir_vectores(vector1,vector2)
        if resultado.success==True:
            print("El resultado de la división de vectores es:\n")
            print(resultado.result)
        else:
            print(resultado.message)

def calculadoraMatrices(matriz1,matriz2,opcion,client):
    resultado = calc_mat()
    if opcion==14:
        print("Llamemos al servidor\n")
        resultado=client.sumar_matrices(matriz1,matriz2)
        if resultado.success:
            print("El resultado de la suma de matrices es:\n")
            print(resultado.result.matriz)
        else:
            print(resultado.message)
    elif opcion==15:
        resultado=client.restar_matrices(matriz1,matriz2)
        if resultado.success==True:
            print("El resultado de la resta de matrices es:\n")
            print(resultado.result.matriz)
        else:
            print(resultado.message)
    elif opcion==16:
        resultado=client.multiplicar_matrices(matriz1,matriz2)
        if resultado.success==True:
            print("El resultado de la multiplicar de matrices es:\n")
            print(resultado.result.matriz)
        else:
            print(resultado.message)

def calculadoraDeterminante(matriz,client):
        resultado = calc_res()
        resultado = client.determinante(matriz)
        if resultado.success==True:
            print("El resultado del determinante es:\n")
            print(resultado.result)
        else:
            print(resultado.message)

def calculadoraAlgebra(a,b,opcion,client):
        if opcion==18:
            resultado = calc_eu()
            resultado = client.algoritmo_euclides(a,b)
            if resultado.success:
                print("El MCD de "+str(a)+" y "+str(b)+" es: "+str(resultado.mcd))
            else:
                print(resultado.message)
        elif opcion==19:
            resultado = calc_ext_eu()
            resultado = client.algoritmo_extendido_euclides(a,b)
            if resultado.success:
                print("El MCD de "+str(a)+" y "+str(b)+" es "+str(resultado.mcd)+" y su codeficiente X:"+str(resultado.x)+" e Y:"+str(resultado.y))
            else:
                print(resultado.message)

def main():
    transport = TSocket.TSocket("localhost", 9091)
    transport = TTransport.TBufferedTransport(transport)
    protocol = TBinaryProtocol.TBinaryProtocol(transport)

    client = Calculadora.Client(protocol)

    transport.open()
    numeros=list()
    vector1=list()
    vector2=list()
    matriz1= Matrix()
    matriz2= Matrix()
    continuar=0

    try:
        while True:
            opcion = menu()
            if opcion != 20:
                if opcion<5: tipo=1
                elif opcion<10: tipo=2
                elif opcion<14: tipo=3
                elif opcion<16: tipo=4
                elif opcion==16: tipo=5
                elif opcion==17: tipo=6
                else: tipo=7 

                if tipo==1:
                    cantidad = int(input("Introduzca la cantidad de números con los que quiere operar: \n"))
                    if cantidad<=100 and cantidad>=1:
                        numeros.clear()
                        for numero in range(0,cantidad):
                            valor=float(input("\nIntroduzca el número "+str(numero+1)+": "))
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
                elif tipo==3:
                    cantidad=int(input("Introduzca el tamaño que desea que tengan los vectores(ambos tendrán el mismo): "))
                    vector1.clear()
                    vector2.clear()
                    for numero in range(0,cantidad):
                        valor = float(input("\nIntroduzca el valor del vector1["+str(numero+1)+"]: "))
                        vector1.append(valor)
                        valor = float(input("Introduzca el valor del vector2["+str(numero+1)+"]: "))
                        vector2.append(valor)
                    calculadoraVectores(vector1,vector2,opcion,client)
                elif tipo==4:
                    matriz1.matriz = []
                    matriz2.matriz = []
                    filas=int(input("Introduzca el número de filas que desea que tengan las matrices: "))
                    columnas=int(input("\nIntroduzca el número de columnas que desea que tengan las matrices: "))
                    matriz1.filas=filas
                    matriz2.filas=filas
                    matriz1.columnas=columnas
                    matriz2.columnas=columnas
                    for fila in range(filas):
                        matriz1.matriz.append([0]*columnas)
                        matriz2.matriz.append([0]*columnas)
                        for columna in range(columnas):
                            valor = float(input("\nIntroduzca el valor de la matriz1["+str(fila)+"]["+str(columna)+"]: "))
                            matriz1.matriz[fila][columna]=valor
                            valor = float(input("Introduzca el valor de la matriz2["+str(fila)+"]["+str(columna)+"]: "))
                            matriz2.matriz[fila][columna]=valor
                    calculadoraMatrices(matriz1,matriz2,opcion,client)
                elif tipo==5:
                    matriz1.matriz = []
                    matriz2.matriz = []
                    filas=int(input("Introduzca el número de filas que desea que tenga la primera matriz a multiplicar: "))
                    columnas=int(input("\nIntroduzca el número de columnas que desea que tenga la primera matriz a multiplicar: "))
                    matriz1.filas=filas
                    matriz1.columnas=columnas
                    for fila in range(filas):
                        matriz1.matriz.append([0]*columnas)
                        for columna in range(columnas):
                            valor = float(input("\nIntroduzca el valor de la matriz1["+str(fila)+"]["+str(columna)+"]: "))
                            matriz1.matriz[fila][columna]=valor
                    filas=int(input("Introduzca el número de filas que desea que tenga la segunda matriz a multiplicar(Deber ser igual al número columnas de la primera): "))
                    columnas=int(input("\nIntroduzca el número de columnas que desea que tenga la segunda matriz a multiplicar: "))
                    matriz2.filas=filas
                    matriz2.columnas=columnas
                    for fila in range(filas):
                        matriz2.matriz.append([0]*columnas)
                        for columna in range(columnas):
                            valor = float(input("\nIntroduzca el valor de la matriz2["+str(fila)+"]["+str(columna)+"]: "))
                            matriz2.matriz[fila][columna]=valor
                    calculadoraMatrices(matriz1,matriz2,opcion,client)
                elif tipo==6:
                    matriz1.matriz = []
                    filas=int(input("Introduzca el número de filas que desea que tenga matriz que quiere calcular el determinante: "))
                    columnas=int(input("Introduzca el número de columnas que desea que tenga matriz que quiere calcular el determinante: "))
                    matriz1.filas=filas
                    matriz1.columnas=columnas
                    for fila in range(filas):
                        matriz1.matriz.append([0]*columnas)
                        for columna in range(columnas):
                            valor = float(input("\nIntroduzca el valor de la matriz1["+str(fila)+"]["+str(columna)+"]: "))
                            matriz1.matriz[fila][columna]=valor
                    calculadoraDeterminante(matriz1,client)
                elif tipo==7:
                    a=int(input("Introduzca primer número para calcular MCD: "))
                    b=int(input("Introduzca segundo número para calcular MCD: "))
                    calculadoraAlgebra(a,b,opcion,client)
                continuar=int(input("\nDesea realizar otra operación: "
                                    "\n1. Introduzca cualquier número en caso de que si: "
                                    "\n2. Introduzca 0 en caso de que no: \n"))
                
            if continuar==0 or opcion==20:
                break
    except ValueError as e:
        print("\nError, no se introdujo el valor esperado.")

    transport.close()

if __name__ == "__main__":
    main()