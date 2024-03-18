/*
 * Please do not edit this file.
 * It was generated using rpcgen.
 */

#include "calc.h"

bool_t
xdr_EXTENDED_DOUBLE (XDR *xdrs, EXTENDED_DOUBLE *objp)
{
	register int32_t *buf;

	 if (!xdr_double (xdrs, objp))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_double_vector (XDR *xdrs, double_vector *objp)
{
	register int32_t *buf;

	int i;
	 if (!xdr_int (xdrs, &objp->size))
		 return FALSE;
	 if (!xdr_vector (xdrs, (char *)objp->values, MAX,
		sizeof (double), (xdrproc_t) xdr_double))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_double_matrix (XDR *xdrs, double_matrix *objp)
{
	register int32_t *buf;

	int i;
	 if (!xdr_int (xdrs, &objp->filas))
		 return FALSE;
	 if (!xdr_int (xdrs, &objp->columnas))
		 return FALSE;
	 if (!xdr_vector (xdrs, (char *)objp->values, MAX_MATRIX,
		sizeof (double), (xdrproc_t) xdr_double))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_calc_res (XDR *xdrs, calc_res *objp)
{
	register int32_t *buf;

	 if (!xdr_int (xdrs, &objp->errnum))
		 return FALSE;
	switch (objp->errnum) {
	case 0:
		 if (!xdr_double (xdrs, &objp->calc_res_u.result))
			 return FALSE;
		break;
	default:
		break;
	}
	return TRUE;
}

bool_t
xdr_calc_vec (XDR *xdrs, calc_vec *objp)
{
	register int32_t *buf;

	 if (!xdr_int (xdrs, &objp->errnum))
		 return FALSE;
	switch (objp->errnum) {
	case 0:
		 if (!xdr_double_vector (xdrs, &objp->calc_vec_u.result))
			 return FALSE;
		break;
	default:
		break;
	}
	return TRUE;
}

bool_t
xdr_calc_mat (XDR *xdrs, calc_mat *objp)
{
	register int32_t *buf;

	 if (!xdr_int (xdrs, &objp->errnum))
		 return FALSE;
	switch (objp->errnum) {
	case 0:
		 if (!xdr_double_matrix (xdrs, &objp->calc_mat_u.result))
			 return FALSE;
		break;
	default:
		break;
	}
	return TRUE;
}

bool_t
xdr_add_vector_1_argument (XDR *xdrs, add_vector_1_argument *objp)
{
	 if (!xdr_double_vector (xdrs, &objp->arg1))
		 return FALSE;
	 if (!xdr_double_vector (xdrs, &objp->arg2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_substract_vector_1_argument (XDR *xdrs, substract_vector_1_argument *objp)
{
	 if (!xdr_double_vector (xdrs, &objp->arg1))
		 return FALSE;
	 if (!xdr_double_vector (xdrs, &objp->arg2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_multiply_vector_1_argument (XDR *xdrs, multiply_vector_1_argument *objp)
{
	 if (!xdr_double_vector (xdrs, &objp->arg1))
		 return FALSE;
	 if (!xdr_double_vector (xdrs, &objp->arg2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_divide_vector_1_argument (XDR *xdrs, divide_vector_1_argument *objp)
{
	 if (!xdr_double_vector (xdrs, &objp->arg1))
		 return FALSE;
	 if (!xdr_double_vector (xdrs, &objp->arg2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_add_matrix_1_argument (XDR *xdrs, add_matrix_1_argument *objp)
{
	 if (!xdr_double_matrix (xdrs, &objp->arg1))
		 return FALSE;
	 if (!xdr_double_matrix (xdrs, &objp->arg2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_substract_matrix_1_argument (XDR *xdrs, substract_matrix_1_argument *objp)
{
	 if (!xdr_double_matrix (xdrs, &objp->arg1))
		 return FALSE;
	 if (!xdr_double_matrix (xdrs, &objp->arg2))
		 return FALSE;
	return TRUE;
}

bool_t
xdr_multiply_matrix_1_argument (XDR *xdrs, multiply_matrix_1_argument *objp)
{
	 if (!xdr_double_matrix (xdrs, &objp->arg1))
		 return FALSE;
	 if (!xdr_double_matrix (xdrs, &objp->arg2))
		 return FALSE;
	return TRUE;
}