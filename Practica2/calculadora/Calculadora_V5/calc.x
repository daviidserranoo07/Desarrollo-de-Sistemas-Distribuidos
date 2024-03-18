const MAX = 100;
const MAX_MATRIX = 25;
typedef double EXTENDED_DOUBLE;
typedef struct double_vector double_vector<MAX>;

struct double_vector{
    int size;
    double values[MAX];
};

struct double_matrix{
    int filas;
    int columnas;
    double values[MAX_MATRIX];
};

union calc_res switch (int errnum) {
    case 0:
        double result; /* sin error: resultado de operación */
    default:
        void;          /* con error: nada                   */
};

union calc_vec switch (int errnum) {
    case 0:
        double_vector result;
    default:
        void;
};

union calc_mat switch (int errnum){
    case 0:
        double_matrix result;
    default:
        void;
};

program CALPROG {
    version CAL_VER {
        /*Operaciones Básicas*/
        calc_res ADD(double_vector) = 1;
        calc_res SUBSTRACT(double_vector) = 2;
        calc_res MULTIPLY(double_vector) = 3;
        calc_res DIVIDE(double_vector) = 4;
        /*Operaciones con Vectores*/
        calc_vec ADD_VECTOR(double_vector,double_vector) = 5;
        calc_vec SUBSTRACT_VECTOR(double_vector,double_vector) = 6;
        calc_vec MULTIPLY_VECTOR(double_vector,double_vector) = 7;
        calc_vec DIVIDE_VECTOR(double_vector,double_vector) = 8;
        /*Operaciones con Matrices*/
        calc_mat ADD_MATRIX(double_matrix,double_matrix) = 9;
        calc_mat SUBSTRACT_MATRIX(double_matrix,double_matrix) = 10;
        calc_mat MULTIPLY_MATRIX(double_matrix,double_matrix) = 11;
        calc_res DETERMINANT_MATRIX(double_matrix) = 12;
    } = 1;
} = 0x20000157;
 