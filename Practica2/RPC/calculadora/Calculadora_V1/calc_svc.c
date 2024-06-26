/*
 * Please do not edit this file.
 * It was generated using rpcgen.
 */

#include "calc.h"
#include <stdio.h>
#include <stdlib.h>
#include <rpc/pmap_clnt.h>
#include <string.h>
#include <memory.h>
#include <sys/socket.h>
#include <netinet/in.h>

#ifndef SIG_PF
#define SIG_PF void(*)(int)
#endif

static calc_res *
_add_1 (add_1_argument *argp, struct svc_req *rqstp)
{
	return (add_1_svc(argp->arg1, argp->arg2, rqstp));
}

static calc_res *
_substract_1 (substract_1_argument *argp, struct svc_req *rqstp)
{
	return (substract_1_svc(argp->arg1, argp->arg2, rqstp));
}

static calc_res *
_multiply_1 (multiply_1_argument *argp, struct svc_req *rqstp)
{
	return (multiply_1_svc(argp->arg1, argp->arg2, rqstp));
}

static calc_res *
_divide_1 (divide_1_argument *argp, struct svc_req *rqstp)
{
	return (divide_1_svc(argp->arg1, argp->arg2, rqstp));
}

static void
calprog_1(struct svc_req *rqstp, register SVCXPRT *transp)
{
	union {
		add_1_argument add_1_arg;
		substract_1_argument substract_1_arg;
		multiply_1_argument multiply_1_arg;
		divide_1_argument divide_1_arg;
	} argument;
	char *result;
	xdrproc_t _xdr_argument, _xdr_result;
	char *(*local)(char *, struct svc_req *);

	switch (rqstp->rq_proc) {
	case NULLPROC:
		(void) svc_sendreply (transp, (xdrproc_t) xdr_void, (char *)NULL);
		return;

	case ADD:
		_xdr_argument = (xdrproc_t) xdr_add_1_argument;
		_xdr_result = (xdrproc_t) xdr_calc_res;
		local = (char *(*)(char *, struct svc_req *)) _add_1;
		break;

	case SUBSTRACT:
		_xdr_argument = (xdrproc_t) xdr_substract_1_argument;
		_xdr_result = (xdrproc_t) xdr_calc_res;
		local = (char *(*)(char *, struct svc_req *)) _substract_1;
		break;

	case MULTIPLY:
		_xdr_argument = (xdrproc_t) xdr_multiply_1_argument;
		_xdr_result = (xdrproc_t) xdr_calc_res;
		local = (char *(*)(char *, struct svc_req *)) _multiply_1;
		break;

	case DIVIDE:
		_xdr_argument = (xdrproc_t) xdr_divide_1_argument;
		_xdr_result = (xdrproc_t) xdr_calc_res;
		local = (char *(*)(char *, struct svc_req *)) _divide_1;
		break;

	default:
		svcerr_noproc (transp);
		return;
	}
	memset ((char *)&argument, 0, sizeof (argument));
	if (!svc_getargs (transp, (xdrproc_t) _xdr_argument, (caddr_t) &argument)) {
		svcerr_decode (transp);
		return;
	}
	result = (*local)((char *)&argument, rqstp);
	if (result != NULL && !svc_sendreply(transp, (xdrproc_t) _xdr_result, result)) {
		svcerr_systemerr (transp);
	}
	if (!svc_freeargs (transp, (xdrproc_t) _xdr_argument, (caddr_t) &argument)) {
		fprintf (stderr, "%s", "unable to free arguments");
		exit (1);
	}
	return;
}

int
main (int argc, char **argv)
{
	register SVCXPRT *transp;

	pmap_unset (CALPROG, CAL_VER);

	transp = svcudp_create(RPC_ANYSOCK);
	if (transp == NULL) {
		fprintf (stderr, "%s", "cannot create udp service.");
		exit(1);
	}
	if (!svc_register(transp, CALPROG, CAL_VER, calprog_1, IPPROTO_UDP)) {
		fprintf (stderr, "%s", "unable to register (CALPROG, CAL_VER, udp).");
		exit(1);
	}

	transp = svctcp_create(RPC_ANYSOCK, 0, 0);
	if (transp == NULL) {
		fprintf (stderr, "%s", "cannot create tcp service.");
		exit(1);
	}
	if (!svc_register(transp, CALPROG, CAL_VER, calprog_1, IPPROTO_TCP)) {
		fprintf (stderr, "%s", "unable to register (CALPROG, CAL_VER, tcp).");
		exit(1);
	}

	svc_run ();
	fprintf (stderr, "%s", "svc_run returned");
	exit (1);
	/* NOTREACHED */
}
