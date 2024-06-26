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


typedef double EXTENDED_DOUBLE;

struct calc_res {
	int errnum;
	union {
		double result;
	} calc_res_u;
};
typedef struct calc_res calc_res;

struct add_1_argument {
	double arg1;
	double arg2;
};
typedef struct add_1_argument add_1_argument;

struct substract_1_argument {
	double arg1;
	double arg2;
};
typedef struct substract_1_argument substract_1_argument;

struct multiply_1_argument {
	double arg1;
	double arg2;
};
typedef struct multiply_1_argument multiply_1_argument;

struct divide_1_argument {
	double arg1;
	double arg2;
};
typedef struct divide_1_argument divide_1_argument;

#define CALPROG 0x20000157
#define CAL_VER 1

#if defined(__STDC__) || defined(__cplusplus)
#define ADD 1
extern  calc_res * add_1(double , double , CLIENT *);
extern  calc_res * add_1_svc(double , double , struct svc_req *);
#define SUBSTRACT 2
extern  calc_res * substract_1(double , double , CLIENT *);
extern  calc_res * substract_1_svc(double , double , struct svc_req *);
#define MULTIPLY 3
extern  calc_res * multiply_1(double , double , CLIENT *);
extern  calc_res * multiply_1_svc(double , double , struct svc_req *);
#define DIVIDE 4
extern  calc_res * divide_1(double , double , CLIENT *);
extern  calc_res * divide_1_svc(double , double , struct svc_req *);
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

/* the xdr functions */

#if defined(__STDC__) || defined(__cplusplus)
extern  bool_t xdr_EXTENDED_DOUBLE (XDR *, EXTENDED_DOUBLE*);
extern  bool_t xdr_calc_res (XDR *, calc_res*);
extern  bool_t xdr_add_1_argument (XDR *, add_1_argument*);
extern  bool_t xdr_substract_1_argument (XDR *, substract_1_argument*);
extern  bool_t xdr_multiply_1_argument (XDR *, multiply_1_argument*);
extern  bool_t xdr_divide_1_argument (XDR *, divide_1_argument*);

#else /* K&R C */
extern bool_t xdr_EXTENDED_DOUBLE ();
extern bool_t xdr_calc_res ();
extern bool_t xdr_add_1_argument ();
extern bool_t xdr_substract_1_argument ();
extern bool_t xdr_multiply_1_argument ();
extern bool_t xdr_divide_1_argument ();

#endif /* K&R C */

#ifdef __cplusplus
}
#endif

#endif /* !_CALC_H_RPCGEN */
