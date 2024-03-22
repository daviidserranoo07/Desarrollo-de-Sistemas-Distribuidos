import glob
import sys
import math

from calculadora import Calculadora

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

import logging

logging.basicConfig(level=logging.DEBUG)

def main():
    handler = CalculadoraHandler()
    processor = Calculadora.Processor(handler)
    transport = TSocket.TServerSocket(host="127.0.0.1", port=9090)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    print("iniciando servidor...")
    server.serve()
    print("fin")


class CalculadoraHandler:
    def __init__(self):
        self.log = {}

    def ping(self):
        print("Me han hecho ping()")

    def suma(self, n1, n2):
        print("Sumando " + str(n1) + " con " + str(n2))
        return n1 + n2

    def resta(self, n1, n2):
        print("Restando " + str(n1) + " con " + str(n2))
        return n1 - n2
    
    def multiplicacion(self, n1,n2):
        print("Multiplicando " + str(n1) + " con " + str(n2))
        return n1 * n2

    def division(self, n1,n2):
        valor=-1
        try:
            print("Dividiendo " + str(n1) + " con " + str(n2))
            valor=n1/n2
        except ZeroDivisionError:
            print("Error: No se puede dividir por cero.")
        return valor

    def sen(self, grados):
        print("Calculando seno de " + str(grados))
        return math.sin(grados)
    
    def cos(self, grados):
        print("Calculando coseno de " + str(grados))
        return math.cos(grados)
    
    def tangente(self, grados):
        print("Calculando tangente de " + str(grados))
        return math.tan(grados)
    
    def grados_radianes(self,grados):
        pass
        print("Pasando a radianes: " + str(grados))
        return grados * (math.pi/180)
    
    def radianes_grados(self,radianes):
        pass
        print("Pasando a grados: " + str(radianes))
        return radianes * (180/math.pi)


if __name__ == "__main__":
    main()
