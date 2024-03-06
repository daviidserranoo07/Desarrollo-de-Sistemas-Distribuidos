/* dir.x : Protocolo de listado de directorio remoto */
  const MAX= 255;       /* longitud máxima de la entrada directorio */
  typedef string nametype<MAX>;               /* entrada directorio */  
  typedef struct namenode *namelist;        /* enlace en el listado */

  /*Construimos la estructura de una lista enlazada, next es un puntero a la siguiente entrada de la lista*/
  struct namenode{
    nametype name;        /* nombre de la entrada de directorio */
    namelist next ;                        /* siguiente entrada */
  };

  /* La siguiente unión se utiliza para discriminar entre llamadas
   *                 con éxito y llamadas con errores               */
  union readdir_res switch (int errnum) {
    case 0:
      namelist list; /* sin error: listado del directorio */
    default:
      void;          /* con error: nada                   */
  };

  program DIRPROG {
    version DIRVER {
      readdir_res READDIR(nametype) = 1;
    } =1;
  } = 0x20000155;
