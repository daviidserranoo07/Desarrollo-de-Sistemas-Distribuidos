import java.net.MalformedURLException;
import java.rmi.*;


public class Servidor {
    public static void main(String[] args){
        if(System.getSecurityManager() == null){
            System.setSecurityManager(new SecurityManager());
        }
        try {
            String nombre = args[0], replica=args[1];
            ServidorCliente servidorCliente = new ServidorCliente(nombre,replica);
            Naming.rebind(nombre, servidorCliente);
        } catch (RemoteException | MalformedURLException e) {
            System.err.println("Excepcion: " + e.getMessage());
        }
    }
}
