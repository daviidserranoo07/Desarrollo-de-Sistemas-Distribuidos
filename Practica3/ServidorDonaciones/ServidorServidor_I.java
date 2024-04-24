import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.ArrayList;

public interface ServidorServidor_I extends Remote{
    boolean existeUsuario(String User) throws RemoteException;
    boolean confirmarSesion(String user, String password) throws RemoteException;
    boolean donarReplica(String user,double cantidad) throws RemoteException;
    String identificarUsuario(String user) throws RemoteException;
    int getUsuariosReplica() throws RemoteException;
    double getSubtotal() throws RemoteException;
    ServidorServidor_I getReplica(String host, String nombre) throws RemoteException;
    ArrayList<String> getDonantesReplica(String user) throws RemoteException;
    void asignarServidor(String user, String password) throws RemoteException;
}
