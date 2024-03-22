service Calculadora{
   void ping(),
   double suma(1:double num1, 2:double num2),
   double resta(1:double num1, 2:double num2),
   double multiplicacion(1:double num1, 2:double num2),
   double division(1:double num1, 2:double num2),
   double sen(1:double grados),
   double cos(1:double grados),
   double tangente(1:double grados),
   double grados_radianes(1:double grados),
   double radianes_grados(1:double radianes),
}
