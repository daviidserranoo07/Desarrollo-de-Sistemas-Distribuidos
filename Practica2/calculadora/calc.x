const MAX = 100;
typedef double EXTENDED_DOUBLE;
typedef struct double_vector double_vector<MAX>;

struct double_vector{
    int size;
    double values[MAX];
};

union calc_res switch (int errnum) {
    case 0:
        double result; /* sin error: resultado de operación */
    default:
        void;          /* con error: nada                   */
};

program CALPROG {
    version CAL_VER {
        calc_res ADD(double_vector) = 1;
        calc_res SUBSTRACT(double_vector) = 2;
        calc_res MULTIPLY(double_vector) = 3;
        calc_res DIVIDE(double_vector) = 4;
    } = 1;
} = 0x20000157;
