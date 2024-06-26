/*
 * Please do not edit this file.
 * It was generated using rpcgen.
 */

#ifndef _CALC_H_RPCGEN
#define _CALC_H_RPCGEN

#include <rpc/rpc.h>


#ifdef __cplusplus
extern "C" {
#endif

#define MAX 100
#define MAX_MATRIX 25

typedef double EXTENDED_DOUBLE;


struct double_vector {
	int size;
	double values[MAX];
};
typedef struct double_vector double_vector;

struct double_matrix {
	int filas;
	int columnas;
	double values[MAX_MATRIX];
};
typedef struct double_matrix double_matrix;

struct calc_res {
	int errnum;
	union {
		double result;
	} calc_res_u;
};
typedef struct calc_res calc_res;

struct calc_vec {
	int errnum;
	union {
		double_vector result;
	} calc_vec_u;
};
typedef struct calc_vec calc_vec;

struct calc_mat {
	int errnum;
	union {
		double_matrix result;
	} calc_mat_u;
};
typedef struct calc_mat calc_mat;

#define CALPROG 0x20000157
#define CAL_VER 1

#if defined(__STDC__) || defined(__cplusplus)
#define ADD 1
extern  calc_res * add_1(double_vector , CLIENT *);
extern  calc_res * add_1_svc(double_vector , struct svc_req *);
#define SUBSTRACT 2
extern  calc_res * substract_1(double_vector , CLIENT *);
extern  calc_res * substract_1_svc(double_vector , struct svc_req *);
#define MULTIPLY 3
extern  calc_res * multiply_1(double_vector , CLIENT *);
extern  calc_res * multiply_1_svc(double_vector , struct svc_req *);
#define DIVIDE 4
extern  calc_res * divide_1(double_vector , CLIENT *);
extern  calc_res * divide_1_svc(double_vector , struct svc_req *);
extern int calprog_1_freeresult (SVCXPRT *, xdrproc_t, caddr_t);

#else /* K&R C */
#define ADD 1
extern  calc_res * add_1();
extern  calc_res * add_1_svc();
#define SUBSTRACT 2
extern  calc_res * substract_1();
extern  calc_res * substract_1_svc();
#define MULTIPLY 3
extern  calc_res * multiply_1();
extern  calc_res * multiply_1_svc();
#define DIVIDE 4
extern  calc_res * divide_1();
extern  calc_res * divide_1_svc();
extern int calprog_1_freeresult ();
#endif /* K&R C */

struct add_vector_1_argument {
	double_vector arg1;
	double_vector arg2;
};
typedef struct add_vector_1_argument add_vector_1_argument;

struct substract_vector_1_argument {
	double_vector arg1;
	double_vector arg2;
};
typedef struct substract_vector_1_argument substract_vector_1_argument;

struct multiply_vector_1_argument {
	double_vector arg1;
	double_vector arg2;
};
typedef struct multiply_vector_1_argument multiply_vector_1_argument;

struct divide_vector_1_argument {
	double_vector arg1;
	double_vector arg2;
};
typedef struct divide_vector_1_argument divide_vector_1_argument;

#define CALVEC 0x20000158
#define CAL_VEC 1

#if defined(__STDC__) || defined(__cplusplus)
#define ADD_VECTOR 5
extern  calc_vec * add_vector_1(double_vector , double_vector , CLIENT *);
extern  calc_vec * add_vector_1_svc(double_vector , double_vector , struct svc_req *);
#define SUBSTRACT_VECTOR 6
extern  calc_vec * substract_vector_1(double_vector , double_vector , CLIENT *);
extern  calc_vec * substract_vector_1_svc(double_vector , double_vector , struct svc_req *);
#define MULTIPLY_VECTOR 7
extern  calc_vec * multiply_vector_1(double_vector , double_vector , CLIENT *);
extern  calc_vec * multiply_vector_1_svc(double_vector , double_vector , struct svc_req *);
#define DIVIDE_VECTOR 8
extern  calc_vec * divide_vector_1(double_vector , double_vector , CLIENT *);
extern  calc_vec * divide_vector_1_svc(double_vector , double_vector , struct svc_req *);
extern int calvec_1_freeresult (SVCXPRT *, xdrproc_t, caddr_t);

#else /* K&R C */
#define ADD_VECTOR 5
extern  calc_vec * add_vector_1();
extern  calc_vec * add_vector_1_svc();
#define SUBSTRACT_VECTOR 6
extern  calc_vec * substract_vector_1();
extern  calc_vec * substract_vector_1_svc();
#define MULTIPLY_VECTOR 7
extern  calc_vec * multiply_vector_1();
extern  calc_vec * multiply_vector_1_svc();
#define DIVIDE_VECTOR 8
extern  calc_vec * divide_vector_1();
extern  calc_vec * divide_vector_1_svc();
extern int calvec_1_freeresult ();
#endif /* K&R C */

struct add_matrix_1_argument {
	double_matrix arg1;
	double_matrix arg2;
};
typedef struct add_matrix_1_argument add_matrix_1_argument;

struct substract_matrix_1_argument {
	double_matrix arg1;
	double_matrix arg2;
};
typedef struct substract_matrix_1_argument substract_matrix_1_argument;

struct multiply_matrix_1_argument {
	double_matrix arg1;
	double_matrix arg2;
};
typedef struct multiply_matrix_1_argument multiply_matrix_1_argument;

#define CALMAT 0x20000159
#define CAL_MAT 1

#if defined(__STDC__) || defined(__cplusplus)
#define ADD_MATRIX 9
extern  calc_mat * add_matrix_1(double_matrix , double_matrix , CLIENT *);
extern  calc_mat * add_matrix_1_svc(double_matrix , double_matrix , struct svc_req *);
#define SUBSTRACT_MATRIX 10
extern  calc_mat * substract_matrix_1(double_matrix , double_matrix , CLIENT *);
extern  calc_mat * substract_matrix_1_svc(double_matrix , double_matrix , struct svc_req *);
#define MULTIPLY_MATRIX 11
extern  calc_mat * multiply_matrix_1(double_matrix , double_matrix , CLIENT *);
extern  calc_mat * multiply_matrix_1_svc(double_matrix , double_matrix , struct svc_req *);
#define DETERMINANT_MATRIX 12
extern  calc_res * determinant_matrix_1(double_matrix , CLIENT *);
extern  calc_res * determinant_matrix_1_svc(double_matrix , struct svc_req *);
extern int calmat_1_freeresult (SVCXPRT *, xdrproc_t, caddr_t);

#else /* K&R C */
#define ADD_MATRIX 9
extern  calc_mat * add_matrix_1();
extern  calc_mat * add_matrix_1_svc();
#define SUBSTRACT_MATRIX 10
extern  calc_mat * substract_matrix_1();
extern  calc_mat * substract_matrix_1_svc();
#define MULTIPLY_MATRIX 11
extern  calc_mat * multiply_matrix_1();
extern  calc_mat * multiply_matrix_1_svc();
#define DETERMINANT_MATRIX 12
extern  calc_res * determinant_matrix_1();
extern  calc_res * determinant_matrix_1_svc();
extern int calmat_1_freeresult ();
#endif /* K&R C */

/* the xdr functions */

#if defined(__STDC__) || defined(__cplusplus)
extern  bool_t xdr_EXTENDED_DOUBLE (XDR *, EXTENDED_DOUBLE*);
extern  bool_t xdr_double_vector (XDR *, double_vector*);
extern  bool_t xdr_double_vector (XDR *, double_vector*);
extern  bool_t xdr_double_matrix (XDR *, double_matrix*);
extern  bool_t xdr_calc_res (XDR *, calc_res*);
extern  bool_t xdr_calc_vec (XDR *, calc_vec*);
extern  bool_t xdr_calc_mat (XDR *, calc_mat*);
extern  bool_t xdr_add_vector_1_argument (XDR *, add_vector_1_argument*);
extern  bool_t xdr_substract_vector_1_argument (XDR *, substract_vector_1_argument*);
extern  bool_t xdr_multiply_vector_1_argument (XDR *, multiply_vector_1_argument*);
extern  bool_t xdr_divide_vector_1_argument (XDR *, divide_vector_1_argument*);
extern  bool_t xdr_add_matrix_1_argument (XDR *, add_matrix_1_argument*);
extern  bool_t xdr_substract_matrix_1_argument (XDR *, substract_matrix_1_argument*);
extern  bool_t xdr_multiply_matrix_1_argument (XDR *, multiply_matrix_1_argument*);

#else /* K&R C */
extern bool_t xdr_EXTENDED_DOUBLE ();
extern bool_t xdr_double_vector ();
extern bool_t xdr_double_vector ();
extern bool_t xdr_double_matrix ();
extern bool_t xdr_calc_res ();
extern bool_t xdr_calc_vec ();
extern bool_t xdr_calc_mat ();
extern bool_t xdr_add_vector_1_argument ();
extern bool_t xdr_substract_vector_1_argument ();
extern bool_t xdr_multiply_vector_1_argument ();
extern bool_t xdr_divide_vector_1_argument ();
extern bool_t xdr_add_matrix_1_argument ();
extern bool_t xdr_substract_matrix_1_argument ();
extern bool_t xdr_multiply_matrix_1_argument ();

#endif /* K&R C */

#ifdef __cplusplus
}
#endif

#endif /* !_CALC_H_RPCGEN */
