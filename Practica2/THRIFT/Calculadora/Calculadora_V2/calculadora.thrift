struct Matrix{
   1: list<list<double>> matriz;
   2: i32 filas;
   3: i32 columnas;
}

struct calc_res{
   1: bool success;
   2: string message;
   3: double result;
}

struct calc_vec{
   1: bool success;
   2: string message;
   3: list<double> result;
}

struct calc_mat{
   1: bool success;
   2: string message;
   3: Matrix result;
}

service Calculadora{
   void ping(),
   calc_res suma(1:list<double> elements),
   calc_res resta(1:list<double> elements),
   calc_res multiplicacion(1:list<double> elements),
   calc_res division(1:list<double> elements),
   calc_res sen(1:double grados),
   calc_res cos(1:double grados),
   calc_res tangente(1:double grados),
   calc_res grados_radianes(1:double grados),
   calc_res radianes_grados(1:double radianes),
   calc_vec sumar_vectores(1:list<double> elements,2:list<double> elements2),
   calc_vec restar_vectores(1:list<double> elements,2:list<double> elements2),
   calc_vec multiplicar_vectores(1:list<double> elements,2:list<double> elements2),
   calc_vec dividir_vectores(1:list<double> elements,2:list<double> elements2),
   calc_mat sumar_matrices(1:Matrix matriz1,2:Matrix matriz2),
   calc_mat restar_matrices(1:Matrix matriz1,2:Matrix matriz2),
   calc_mat multiplicar_matrices(1:Matrix matriz1,2:Matrix matriz2),
   calc_res determinante(1:Matrix matriz),
}

service CalculadoraAvanzada{
   void ping(),
}
