import glob
import sys

from calculadora import CalculadoraAvanzada

from thrift.transport import TSocket
from thrift.transport import TTransport
from thrift.protocol import TBinaryProtocol
from thrift.server import TServer

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


if __name__ == "__main__":
    main()