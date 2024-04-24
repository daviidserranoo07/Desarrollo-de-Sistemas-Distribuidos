import java.rmi.Remote;
import java.rmi.RemoteException;
import java.util.ArrayList;

public interface ServidorCliente_I extends Remote{
    boolean registrar(String user, String password) throws RemoteException;
    boolean iniciarSesion(String user, String password) throws RemoteException;
    boolean donar(String user,double cantidad) throws RemoteException;
    String getMiServidor(String user) throws RemoteException;
    ArrayList<String> listaDonantes(String user) throws RemoteException;
    ArrayList<String> listaDonantesTotal(String user) throws RemoteException;
    double totalDonadoUsuario(String user) throws RemoteException;
    double totalDonado() throws RemoteException;
    double subtotal() throws RemoteException;
    int getUsuarios() throws RemoteException;
    int getTotalUsuarios() throws RemoteException;
}
