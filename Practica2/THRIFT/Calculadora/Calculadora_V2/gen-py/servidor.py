import glob
import sys
import math
import numpy as np

from calculadora import Calculadora

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer
from calculadora.ttypes import calc_res
from calculadora.ttypes import calc_vec
from calculadora.ttypes import calc_mat
from calculadora.ttypes import Matrix

import logging


logging.basicConfig(level=logging.DEBUG)

def main():
    handler = CalculadoraHandler()
    processor = Calculadora.Processor(handler)
    transport = TSocket.TServerSocket(host="127.0.0.1", port=9091)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    print("Iniciando servidor básico...")
    server.serve()
    print("Fin")


class CalculadoraHandler:
    def __init__(self):
        self.log = {}

    def ping(self):
        print("Me han hecho ping()")
    
    def llamarAvanzado(self,operacion,a,b):
        transport = TSocket.TSocket("localhost", 9092)
        transport = TTransport.TBufferedTransport(transport)
        protocol = TBinaryProtocol.TBinaryProtocol(transport)

        client = Calculadora.Client(protocol)
        transport.open()

        if operacion==1:
            return client.algoritmo_euclides(a,b)
        elif operacion==2:
            return client.algoritmo_extendido_euclides(a,b)

        transport.close()

    def suma(self,numeros):
        resultado = calc_res()
        resultado.success = True
        if len(numeros) <= 0: 
            resultado.success=False
            resultado.message = " No podemos sumar una cantidad de número menor o igual a cero"
        else:
            resultado.result = sum(numeros)
        return resultado

    def resta(self, numeros):
        resultado = calc_res()
        resultado.success=True
        if len(numeros) <= 0: 
            resultado.success=False
            resultado.message = " No podemos restar una cantidad de número menor o igual a cero"
        else:
            resultado.result = numeros[0]
            for valor in range(1,len(numeros)):
                resultado.result=resultado.result-numeros[valor]
        return resultado
    
    def multiplicacion(self, numeros):
        resultado = calc_res()
        resultado.success=True
        if len(numeros) <= 0: 
            resultado.success=False
            resultado.message = " No podemos restar una cantidad de número menor o igual a cero"
        else:
            resultado.result=1
            for valor in range(0,len(numeros)):
                resultado.result=resultado.result*numeros[valor]
        return resultado

    def division(self, numeros):
        resultado = calc_res()
        resultado.success = True

        if any(num == 0 for num in numeros[1:]) or len(numeros)<=0:
            resultado.success = False
            resultado.message = "La división por cero no está definida"
            return resultado

        resultado.result = numeros[0]
        for valor in numeros[1:]:
                resultado.result /= valor
        return resultado

    def sen(self, grados):
        resultado = calc_res()
        print("Calculando seno de " + str(grados))
        try:
            resultado.success=True
            print("Calculando seno de " + str(grados))
            resultado.result=math.sin(grados)
            return resultado
        except ValueError as e:
            resultado.success = False
            resultado.message = "El ángulo debe estar entre 0 y 360 grados"

        return resultado
    
    def cos(self, grados):
        resultado = calc_res()
        print("Calculando coseno de " + str(grados))
        try:
            resultado.result = math.cos(grados)
            resultado.success = True
        except ValueError as e:
            resultado.success = False
            resultado.message = "Error al calcular el coseno"
        return resultado
    
    def tangente(self, grados):
        resultado = calc_res()
        print("Calculando tangente de " + str(grados))
        try:
            resultado.result = math.tan(grados)
            resultado.success = True
        except ValueError as e:
            resultado.success = False
            resultado.message = "Error al calcular la tangente"
        return resultado
    
    def grados_radianes(self,grados):
        resultado = calc_res()
        print("Pasando a radianes: " + str(grados))
        try:
            resultado.result = grados * (math.pi/180)
            resultado.success = True
        except ValueError as e:
            resultado.success = False
            resultado.message = "Error al convertir grados a radianes"
        return resultado
    
    def radianes_grados(self,radianes):
        resultado = calc_res()
        print("Pasando a grados: " + str(radianes))
        try:
            resultado.result = radianes * (180/math.pi)
            resultado.success = True
        except ValueError as e:
            resultado.success = False
            resultado.message = "Error al convertir radianes a grados"
        return resultado

    def sumar_vectores(self,vector1,vector2):
        resultado = calc_vec()
        if len(vector1)<=0 or len(vector2)<=0:
            resultado.success=False
            resultado.message="Error el tamaño de ambos vectores debe ser mayor que cero"
        else:
            resultado.success=True
            resultado.result = []
            for valor in range(0,len(vector1)):
                resultado.result.append(vector1[valor]+vector2[valor])
        return resultado
    
    def restar_vectores(self,vector1,vector2):
        resultado = calc_vec()
        if len(vector1)<=0 or len(vector2)<=0:
            resultado.success=False
            resultado.message="Error el tamaño de ambos vectores debe ser mayor que cero"
        else:
            resultado.success=True
            resultado.result = []
            for valor in range(0,len(vector1)):
                resultado.result.append(vector1[valor]-vector2[valor])
        return resultado

    def multiplicar_vectores(self,vector1,vector2):
        resultado = calc_vec()
        if len(vector1)<=0 or len(vector2)<=0:
            resultado.success=False
            resultado.message="Error el tamaño de ambos vectores debe ser mayor que cero"
        else:
            resultado.success=True
            resultado.result = []
            for valor in range(0,len(vector1)):
                resultado.result.append(vector1[valor]*vector2[valor])
        return resultado

    def dividir_vectores(self,vector1,vector2):
        resultado = calc_vec()
        if len(vector1)<=0 or len(vector2)<=0:
            resultado.success=False
            resultado.message="Error el tamaño de ambos vectores debe ser mayor que cero"
        elif any(num == 0 for num in vector2[1:]):
            resultado.success = False
            resultado.message = "La división por cero no está definida"
        else:
            resultado.success=True
            resultado.result = []
            for valor in range(0,len(vector1)):
                resultado.result.append(vector1[valor]/vector2[valor])
        return resultado

    def sumar_matrices(self,matriz1,matriz2):
        print("Sumando matrices...")
        resultado = calc_mat()
        resultado.success=True
        filas=matriz1.filas
        columnas=matriz1.columnas

        if matriz1.filas != matriz2.filas or matriz1.columnas != matriz2.columnas:
            resultado.success=False
            resultado.message="El número de filas o columnas no es igual para ambas matrices"
            return resultado
        
        resultado.result = Matrix()
        resultado.result.filas = filas
        resultado.result.columnas = columnas
        resultado.result.matriz = []

        for i in range(filas):
            resultado.result.matriz.append([0]*columnas)
            for j in range(columnas):
                resultado.result.matriz[i][j]=matriz1.matriz[i][j]+matriz2.matriz[i][j]
        print("¡¡¡Sumadas!!!")
        return  resultado
    

    def restar_matrices(self,matriz1,matriz2):
        print("Restando matrices...")
        resultado = calc_mat()
        resultado.success=True
        filas=matriz1.filas
        columnas=matriz1.columnas

        if matriz1.filas != matriz2.filas or matriz1.columnas != matriz2.columnas:
            resultado.success=False
            resultado.message="El número de filas o columnas no es igual para ambas matrices"
            return resultado
        
        resultado.result = Matrix()
        resultado.result.filas = filas
        resultado.result.columnas = columnas
        resultado.result.matriz = []

        for i in range(filas):
            resultado.result.matriz.append([0]*columnas)
            for j in range(columnas):
                resultado.result.matriz[i][j]=matriz1.matriz[i][j]-matriz2.matriz[i][j]
        print("¡¡¡Restadas!!!")
        return  resultado
    
    def multiplicar_matrices(self,matriz1,matriz2):
        print("Multiplicando matrices...")
        resultado = calc_mat()
        resultado.success=True
        filas1=matriz1.filas
        columnas2=matriz2.columnas
        filas2=matriz2.filas

        if matriz1.columnas != matriz2.filas:
            resultado.success=False
            resultado.message="El número de filas de la primera matriz y filas de la segunda matriz no es igual para ambas matrices"
            return resultado

        resultado.result = Matrix()
        resultado.result.filas = filas1
        resultado.result.columnas = columnas2
        resultado.result.matriz = []
        
        for i in range(filas1):
            resultado.result.matriz.append([0] * columnas2)
            for j in range(columnas2):
                for k in range(filas2):
                    resultado.result.matriz[i][j] += matriz1.matriz[i][k] * matriz2.matriz[k][j]
        
        print("¡¡¡Multiplicadas!!!")
        return resultado
    
    def determinante(self,matriz):
        print("Calculando determinante...")
        resultado = calc_res()
        resultado.success=True

        if matriz.filas!=matriz.columnas:
            resultado.success=False
            resultado.message="El determinante solo esta definido para matrices cuadradas "
            return resultado
        else:
            if matriz.filas==1:
                resultado.result=matriz.matriz[0][0]
                return resultado
            elif matriz.filas==2:
                resultado.result=(matriz.matriz[0][0]*matriz.matriz[1][1])-(matriz.matriz[0][1]*matriz.matriz[1][0])
                return resultado
            elif matriz.filas==3:
                resultado.result=((matriz.matriz[0][0]*matriz.matriz[1][1]*matriz.matriz[2][2])+
                                  (matriz.matriz[0][1]*matriz.matriz[1][2]*matriz.matriz[2][0])+
                                  (matriz.matriz[0][2]*matriz.matriz[1][0]*matriz.matriz[2][1])-
                                  (matriz.matriz[0][2]*matriz.matriz[1][1]*matriz.matriz[2][0])-
                                  (matriz.matriz[0][0]*matriz.matriz[1][2]*matriz.matriz[2][1])-
                                  (matriz.matriz[0][1]*matriz.matriz[1][0]*matriz.matriz[2][2]))
                print("¡¡¡Calculado!!!...")
                return resultado
            else:
                resultado.success=False
                resultado.message = "El determinante solo está definido para matrices de tamaño 3x3"
                return resultado
    
    def algoritmo_euclides(self,a,b):
        print("Llamando al servidor de Álgebra...")
        return self.llamarAvanzado(1,a,b)

    def algoritmo_extendido_euclides(self,a,b):
        print("Llamando al servidor de Álgebra...")
        return self.llamarAvanzado(2,a,b)



if __name__ == "__main__":
    main()
