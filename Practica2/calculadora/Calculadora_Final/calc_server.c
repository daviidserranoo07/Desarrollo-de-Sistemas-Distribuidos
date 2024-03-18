/*
 * This is sample code generated by rpcgen.
 * These are only templates and you can use them
 * as a guideline for developing your own functions.
 */

#include "calc.h"

#define MAX_SIZE 100
#define MIN 0
#define MAX_SIZE_MATRIX 25
#define MAX_ROWS 5
#define MAX_COLUMNS 5
#define MAX_ROWS_D 3
#define MAX_COLUMNS_D 3


/////////////////////OPERACIONES BÁSICAS/////////////////////

calc_res *
add_1_svc(double_vector arg1,  struct svc_req *rqstp)
{
	static calc_res  result;

	xdr_free(xdr_calc_res, &result);
	
	result.calc_res_u.result=0;

	if(arg1.size>MAX_SIZE || arg1.size<MIN){
		result.errnum=-1;
		return &result;
	}

	result.calc_res_u.result=arg1.values[0];

	for(int i=1;i<arg1.size;i++){
		result.calc_res_u.result+=arg1.values[i];
	}
	return &result;
}

calc_res *
substract_1_svc(double_vector arg1,  struct svc_req *rqstp)
{
	static calc_res  result;

	xdr_free(xdr_calc_res, &result);

	result.calc_res_u.result=0;

	if(arg1.size>MAX_SIZE || arg1.size<MIN){
		result.errnum=-1;
		return &result;
	}

	result.calc_res_u.result=arg1.values[0];

	for(int i=1;i<arg1.size;i++){
		result.calc_res_u.result-=arg1.values[i];
	}
	return &result;
}

calc_res *
multiply_1_svc(double_vector arg1,  struct svc_req *rqstp)
{
	static calc_res  result;

	xdr_free(xdr_calc_res, &result);

	result.calc_res_u.result=0;

	if(arg1.size>MAX_SIZE || arg1.size<MIN){
		result.errnum=-1;
		return &result;
	}

	result.calc_res_u.result=arg1.values[0];

	for(int i=1;i<arg1.size;i++){
		result.calc_res_u.result*=arg1.values[i];
	}

	return &result;
}

calc_res *
divide_1_svc(double_vector arg1,  struct svc_req *rqstp)
{
	static calc_res  result;

	xdr_free(xdr_calc_res, &result);

	result.calc_res_u.result=0;

	if(arg1.size>MAX_SIZE || arg1.size<MIN){
		result.errnum=-1;
		return &result;
	}

	result.calc_res_u.result=arg1.values[0];
	result.errnum = 0;

	for(int i=1;i<arg1.size;i++){
		if(arg1.values[i]==0.0){
			result.errnum=-1;
			return &result;
		}
		result.calc_res_u.result/=arg1.values[i];
	}
	return &result;
}

/////////////////////OPERACIONES CON LOS VECTORES/////////////////////

calc_vec *
add_vector_1_svc(double_vector arg1, double_vector arg2,  struct svc_req *rqstp)
{
	static calc_vec  result;

	xdr_free(xdr_calc_vec, &result);

	for(int i=0;i<arg1.size;i++){
		result.calc_vec_u.result.values[i]=0;
	}

	if(arg1.size>MAX_SIZE || arg2.size>MAX_SIZE || arg1.size<MIN || arg2.size<MIN || arg1.size!=arg2.size){
		result.errnum=-1;
		return &result;
	}

	result.calc_vec_u.result.size=arg1.size;

	for(int i=0;i<arg1.size;i++){
		result.calc_vec_u.result.values[i]=arg1.values[i]+arg2.values[i];
	}

	return &result;
}

calc_vec *
substract_vector_1_svc(double_vector arg1, double_vector arg2,  struct svc_req *rqstp)
{
	static calc_vec  result;

	xdr_free(xdr_calc_vec, &result);

	for(int i=0;i<arg1.size;i++){
		result.calc_vec_u.result.values[i]=0;
	}

	if(arg1.size>MAX_SIZE || arg2.size>MAX_SIZE || arg1.size<MIN || arg2.size<MIN || arg1.size!=arg2.size){
		result.errnum=-1;
		return &result;
	}

	result.calc_vec_u.result.size=arg1.size;

	for(int i=0;i<arg1.size;i++){
		result.calc_vec_u.result.values[i]=arg1.values[i]-arg2.values[i];
	}

	return &result;
}

calc_vec *
multiply_vector_1_svc(double_vector arg1, double_vector arg2,  struct svc_req *rqstp)
{
	static calc_vec  result;

	xdr_free(xdr_calc_vec, &result);

	for(int i=0;i<arg1.size;i++){
		result.calc_vec_u.result.values[i]=0;
	}

	if(arg1.size>MAX_SIZE || arg2.size>MAX_SIZE || arg1.size<MIN || arg2.size<MIN || arg1.size!=arg2.size){
		result.errnum=-1;
		return &result;
	}

	result.calc_vec_u.result.size=arg1.size;

	for(int i=0;i<arg1.size;i++){
		result.calc_vec_u.result.values[i]=arg1.values[i]*arg2.values[i];
	}

	return &result;
}

calc_vec *
divide_vector_1_svc(double_vector arg1, double_vector arg2,  struct svc_req *rqstp)
{
	static calc_vec  result;

	xdr_free(xdr_calc_vec, &result);

	for(int i=0;i<arg1.size;i++){
		result.calc_vec_u.result.values[i]=0;
	}

	if(arg1.size>MAX_SIZE || arg2.size>MAX_SIZE || arg1.size<MIN || arg2.size<MIN || arg1.size!=arg2.size){
		result.errnum=-1;
		return &result;
	}

	result.calc_vec_u.result.size=arg1.size;
	result.errnum = 0;

	for(int i=0;i<arg1.size;i++){
		if(arg2.values[i]==0.0){
			result.errnum=-1;
			return &result;
		}
		result.calc_vec_u.result.values[i]=arg1.values[i]/arg2.values[i];
	}
	return &result;
}

/////////////////////OPERACIONES CON LAS MATRICES/////////////////////

calc_mat *
add_matrix_1_svc(double_matrix arg1, double_matrix arg2,  struct svc_req *rqstp)
{
	static calc_mat  result;

	xdr_free(xdr_calc_mat, &result);

	//Ponemos a 0 Matriz Resultado
	for(int i=0;i<arg1.filas;i++){
		for(int j=0;j<arg1.columnas;j++){
			result.calc_mat_u.result.values[i*arg1.columnas+j]=0;
		}
	}

	if(arg1.filas>MAX_ROWS || arg1.columnas>MAX_COLUMNS || arg1.filas<MIN || arg1.columnas<MIN || arg1.filas!=arg2.filas && arg1.columnas!=arg2.columnas){
		result.errnum=-1;
		return &result;
	}

	result.calc_mat_u.result.filas=arg1.filas;
	result.calc_mat_u.result.columnas=arg1.columnas;

	for(int i=0;i<arg1.filas;i++){
		for(int j=0;j<arg1.columnas;j++){
			result.calc_mat_u.result.values[i*arg1.columnas+j]=arg1.values[i*arg1.columnas+j]+arg2.values[i*arg1.columnas+j];
		}
	}


	return &result;
}

calc_mat *
substract_matrix_1_svc(double_matrix arg1, double_matrix arg2,  struct svc_req *rqstp)
{
	static calc_mat  result;

	xdr_free(xdr_calc_mat, &result);

		//Ponemos a 0 Matriz Resultado
	for(int i=0;i<arg1.filas;i++){
		for(int j=0;j<arg1.columnas;j++){
			result.calc_mat_u.result.values[i*arg1.columnas+j]=0;
		}
	}

	if(arg1.filas>MAX_ROWS || arg1.columnas>MAX_COLUMNS || arg1.filas<MIN || arg1.columnas<MIN  || arg1.filas!=arg2.filas && arg1.columnas!=arg2.columnas){
		result.errnum=-1;
		return &result;
	}

	result.calc_mat_u.result.filas=arg1.filas;
	result.calc_mat_u.result.columnas=arg1.columnas;

	for(int i=0;i<arg1.filas;i++){
		for(int j=0;j<arg1.columnas;j++){
			result.calc_mat_u.result.values[i*arg1.columnas+j]=arg1.values[i*arg1.columnas+j]-arg2.values[i*arg1.columnas+j];
		}
	}
	return &result;
}

calc_mat *
multiply_matrix_1_svc(double_matrix arg1, double_matrix arg2,  struct svc_req *rqstp)
{
	static calc_mat  result;

	xdr_free(xdr_calc_mat, &result);

	//Ponemos a 0 Matriz Resultado
	for(int i=0;i<arg1.filas;i++){
		for(int j=0;j<arg1.columnas;j++){
			result.calc_mat_u.result.values[i*arg1.columnas+j]=0;
		}
	}


	if(arg1.filas>MAX_ROWS || arg1.columnas>MAX_COLUMNS || arg1.filas<MIN || arg1.columnas<MIN){
		result.errnum=-1;
		return &result;
	}else if(arg1.columnas!=arg2.filas){
		result.errnum=-2;
		return &result;
	}

	result.calc_mat_u.result.filas=arg1.filas;
	result.calc_mat_u.result.columnas=arg2.columnas;

    for(int i=0;i<arg1.filas;i++) {
        for(int j=0;j<arg2.columnas;j++) {
            for(int k=0;k<arg1.columnas;k++) {
                result.calc_mat_u.result.values[i*arg2.columnas+j]+=
                    arg1.values[i*arg1.columnas+k]*arg2.values[k*arg2.columnas+j];
            }
        }
    }

	return &result;
}

calc_res *
determinant_matrix_1_svc(double_matrix arg1,  struct svc_req *rqstp)
{
	static calc_res  result;

	xdr_free(xdr_calc_res, &result);

	if(arg1.filas>MAX_ROWS_D || arg1.columnas>MAX_COLUMNS_D || arg1.filas<MIN || arg1.columnas<MIN || arg1.filas!=arg1.columnas){
		result.errnum=-1;
		return &result;
	}

    //Caso base: si la matriz es 1x1, su determinante es el propio elemento
    if (arg1.filas==1) {
		result.calc_res_u.result=arg1.values[0];
        return &result;
    } else if (arg1.filas==2) { // Caso base: si la matriz es 2x2, aplicamos la fórmula directamente
        result.calc_res_u.result=(arg1.values[0]*arg1.values[3])-(arg1.values[1]*arg1.values[2]);
		return &result;
    }
	
	result.calc_res_u.result=(arg1.values[0]*arg1.values[4]*arg1.values[8])+(arg1.values[1]*arg1.values[5]*arg1.values[6])+(arg1.values[2]*arg1.values[3]*arg1.values[7])- 
		  (arg1.values[2]*arg1.values[4]*arg1.values[6])-(arg1.values[0]*arg1.values[5]*arg1.values[7])-(arg1.values[1]*arg1.values[3]*arg1.values[8]);
	
	return &result;
}
