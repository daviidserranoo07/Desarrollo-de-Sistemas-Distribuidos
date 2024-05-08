import java.rmi.NotBoundException;
import java.rmi.RemoteException;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.rmi.server.UnicastRemoteObject;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

public class ServidorCliente extends UnicastRemoteObject implements ServidorCliente_I,ServidorServidor_I{
    private static int INTENTOS = 3;
    private static String HOST = "localhost";

    
    private Map<String,String> usuariosRegistrados;
    private Map<String,Double> donacionesPorUsuario;
    private Map<String,Boolean> usuarioDonado;
    private Map<String,Integer> intentos;
    private double subtotal;
    private String replica,nombre;

    public ServidorCliente(String nombre, String replica) throws RemoteException{
        super();
        this.usuariosRegistrados = new HashMap<>();
        this.donacionesPorUsuario = new HashMap<>();
        this.intentos = new HashMap<>();
        this.usuarioDonado = new HashMap<>();
        this.subtotal=0;
        this.nombre = nombre;
        this.replica = replica;
    }

    @Override
    public boolean registrar(String user, String password) throws RemoteException {
        ServidorServidor_I replica = this.getReplica(ServidorCliente.HOST, this.replica);
        if (!this.usuariosRegistrados.containsKey(user) && !replica.existeUsuario(user)) {
            if (this.getUsuarios() <= replica.getUsuariosReplica()) {
                this.asignarServidor(user, password);
            } else {
                replica.asignarServidor(user, password);
            }
            return true; // Se ha registrado correctamente el usuario
        } else {
            return false; // Ya existe un usuario registrado con ese nombre
        }
    }
    


    @Override
    public boolean iniciarSesion(String user, String password) throws RemoteException {
        if(this.usuariosRegistrados.containsKey(user)){
            String possiblePassword = this.usuariosRegistrados.get(user);
            if(intentos.get(user)<ServidorCliente.INTENTOS){
                if(password.equals(possiblePassword)){
                    return true;
                }else{
                    intentos.put(user, intentos.get(user)+1);
                    return false;
                }
            }else{
                return false;
            }
        }else if (this.getReplica(ServidorCliente.HOST, this.replica).existeUsuario(user)) {
            return this.getReplica(ServidorCliente.HOST, this.replica).confirmarSesion(user, password);
        }else{
            return false;
        }
    }

    @Override
    public boolean donar(String user,double cantidad) throws RemoteException {
        if(this.existeUsuario(user) && cantidad>0.0){
            double actual = this.donacionesPorUsuario.get(user);
            this.donacionesPorUsuario.put(user,actual+cantidad);
            this.usuarioDonado.put(user, true);
            this.subtotal+=cantidad;
            return true;
        }else if(this.getReplica(ServidorCliente.HOST,this.replica).existeUsuario(user)){
            double actual = this.donacionesPorUsuario.get(user);
            return this.getReplica(ServidorCliente.HOST, this.replica).donarReplica(user, actual+cantidad);
        }else{
            return false; //No esta registrado en el sistema el usuario y no puede donar
        }
    }

    @Override
    public ArrayList<String> listaDonantes(String user) throws RemoteException {
        ArrayList<String> donantes = new ArrayList<>();
        if(this.usuarioDonado.get(user)){
            for(Map.Entry<String,Double> entry : donacionesPorUsuario.entrySet()){
                String usuario = entry.getKey();
                Double donaciones = entry.getValue();
                if(donaciones>0){
                    donantes.add(usuario);
                }
            }
            return donantes;
        }
        return donantes;
    }

    @Override
    public double totalDonado(String user) throws RemoteException {
        if(this.usuarioDonado.get(user)){
            ServidorServidor_I replica = this.getReplica(ServidorCliente.HOST, this.replica);
            return this.subtotal + replica.getSubtotal();
        }
        return -1;
    }

    @Override
    public boolean existeUsuario(String user) throws RemoteException {
        return this.usuariosRegistrados.containsKey(user);
    }

    @Override
    public ServidorServidor_I getReplica(String host, String nombre) throws RemoteException {
        ServidorServidor_I replica = null;
        
        try {
            Registry mireg = LocateRegistry.getRegistry(host, 1099);
            replica = (ServidorServidor_I)mireg.lookup(nombre);
        } catch(NotBoundException | RemoteException e) {
            System.err.println("Exception del sistema: " + e);
        }
        return replica;
    }

    @Override
    public double getSubtotal() throws RemoteException {
        return this.subtotal;
    }

    @Override
    public int getUsuariosReplica() throws RemoteException {
        return this.usuariosRegistrados.size();
    }

    @Override
    public String identificarUsuario(String user) throws RemoteException {
        if(!this.existeUsuario(user)){
            ServidorServidor_I replica = this.getReplica(ServidorCliente.HOST, this.replica);
            if(replica.existeUsuario(user)){
                return this.replica;
            }else{
                return "No existe";
            }
        }else{
            return this.nombre;
        }
    }

    @Override
    public void asignarServidor(String user, String password) throws RemoteException {
        this.usuariosRegistrados.put(user,password);
        this.donacionesPorUsuario.put(user,0.0);
        this.intentos.put(user, 0);
        this.usuarioDonado.put(user, false);
    }

    @Override
    public boolean confirmarSesion(String user, String password) throws RemoteException {
        String possiblePassword = this.usuariosRegistrados.get(user);
        if(intentos.get(user)<ServidorCliente.INTENTOS){
            if(password.equals(possiblePassword)){
                return true;
            }else{
                intentos.put(user, intentos.get(user)+1);
                return false;
            }
        }else{
            return false;
        }
    }

    @Override
    public ArrayList<String> getDonantesReplica(String user) throws RemoteException {
        ArrayList<String> donantes = new ArrayList<>();
        for(Map.Entry<String,Double> entry : donacionesPorUsuario.entrySet()){
            String usuario = entry.getKey();
            Double donaciones = entry.getValue();
            if(donaciones>0){
                donantes.add(usuario);
            }
        }
        return donantes;
    }

    @Override
    public boolean donarReplica(String user, double cantidad) throws RemoteException {
        this.donacionesPorUsuario.put(user,cantidad);
        this.subtotal+=cantidad;
        return true;
    }

    @Override
    public double subtotal(String user) throws RemoteException {
        if(this.usuarioDonado.get(user)){
            return this.subtotal;
        }
        return -1;
    }

    @Override
    public int getUsuarios() throws RemoteException {
        return this.donacionesPorUsuario.size();
    }

    @Override
    public int getTotalUsuarios() throws RemoteException {
        return  this.getUsuarios() + this.getReplica(ServidorCliente.HOST,this.replica).getUsuariosReplica();
    }

    @Override
    public String getMiServidor(String user) throws RemoteException {
       return this.identificarUsuario(user);
    }

    @Override
    public double totalDonadoUsuario(String user) throws RemoteException {
        if(this.existeUsuario(user)){
            return this.donacionesPorUsuario.get(user);
        }
        return -1;
    }

    @Override
    public ArrayList<String> listaDonantesTotal(String user) throws RemoteException {
        ArrayList<String> totalDonantes = new ArrayList<>();
        int i;
        if(this.existeUsuario(user) && this.usuarioDonado.get(user)){
            for(i=0;i<this.listaDonantes(user).size();i++){
                totalDonantes.add(this.listaDonantes(user).get(i));
            }
            ServidorServidor_I replica = this.getReplica(ServidorCliente.HOST,this.replica);
            for(i=0;i<replica.getDonantesReplica(user).size();i++){
                totalDonantes.add(replica.getDonantesReplica(user).get(i));
            }
            return totalDonantes;
        }
        return totalDonantes;
    } 
}
