typedef double EXTENDED_DOUBLE;

union calc_res switch (int errnum) {
    case 0:
      double result; /* sin error: resultado de operación */
    default:
      void;          /* con error: nada                   */
};

program CALPROG{
  version CAL_VER{
    calc_res ADD(double, double) = 1;
    calc_res SUBSTRACT(double, double) = 2;
    calc_res MULTIPLY(double, double) = 3;
    calc_res DIVIDE(double, double) = 4;
  } = 1;
} = 0x20000157;