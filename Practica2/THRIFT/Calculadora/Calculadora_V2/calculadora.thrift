struct Matrix{
   1: list<list<double>> matriz;
   2: i32 filas;
   3: i32 columnas;
}

service Calculadora{
   void ping(),
   double suma(1:list<double> elements),
   double resta(1:list<double> elements),
   double multiplicacion(1:list<double> elements),
   double division(1:list<double> elements),
   double sen(1:double grados),
   double cos(1:double grados),
   double tangente(1:double grados),
   double grados_radianes(1:double grados),
   double radianes_grados(1:double radianes),
   list<double> sumar_vectores(1:list<double> elements,2:list<double> elements2)
   list<double> restar_vectores(1:list<double> elements,2:list<double> elements2)
   list<double> multiplicar_vectores(1:list<double> elements,2:list<double> elements2)
   list<double> dividir_vectores(1:list<double> elements,2:list<double> elements2)
   Matrix sumar_matrices(1:Matrix matriz1,2:Matrix matriz2)
   Matrix restar_matrices(1:Matrix matriz1,2:Matrix matriz2)
   Matrix multiplicar_matrices(1:Matrix matriz1,2:Matrix matriz2)
   Matrix determinante(1:Matrix matriz)
   
}
