import glob
import sys

from calculadora import CalculadoraAvanzada

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer
from calculadora.ttypes import calc_eu
from calculadora.ttypes import calc_ext_eu

import logging

logging.basicConfig(level=logging.DEBUG)

def main():
    handler = CalculadoraHandler()
    processor = CalculadoraAvanzada.Processor(handler)
    transport = TSocket.TServerSocket(host="127.0.0.1", port=9092)
    tfactory = TTransport.TBufferedTransportFactory()
    pfactory = TBinaryProtocol.TBinaryProtocolFactory()

    server = TServer.TSimpleServer(processor, transport, tfactory, pfactory)

    print("Iniciando servidor avanzado...")
    server.serve()
    print("Fin")


class CalculadoraHandler:
    def __init__(self):
        self.log = {}

    def ping(self):
        print("Me han hecho pigno del servidor 1")

    def algoritmo_euclides(self,a,b):
        print("Calculando algoritmo de euclides...")
        resultado = calc_eu()
        resultado.success=True
        while b!=0:
            a, b = b, a % b
        
        resultado.mcd=a

        print("¡¡¡Calculado!!!")
        return resultado

    def algoritmo_extendido_euclides(self,a,b):
        print("Calculando algoritmo extendido de euclides...")
        resultado = calc_ext_eu()
        resultado.success=True

        if b == 0:
            resultado.mcd=a
            resultado.x=1
            resultado.y=0
            print("¡¡¡Calculado!!!")
            return resultado
        else:
            resultado_anterior = calc_ext_eu()
            resultado_anterior = self.algoritmo_extendido_euclides(b,a%b)
            mcd = resultado_anterior.mcd
            x = resultado_anterior.y
            y = resultado_anterior.x - (a//b)* resultado_anterior.y
            resultado.mcd = mcd
            resultado.x = x 
            resultado.y = y
            print("¡¡¡Calculado!!!")
            return resultado

if __name__ == "__main__":
    main()