import java.io.Console;
import java.rmi.registry.LocateRegistry;
import java.rmi.registry.Registry;
import java.util.ArrayList;
import java.util.Scanner;

public class Cliente {

    public static int menuSesion(){
        Scanner scannerSesion = new Scanner(System.in);
        int opcion=-1;
        while (opcion<0 || opcion>3) {
            System.out.print("\nSelecciona una de las siguientes operaciones:\n"+
                             "1.Registrarse\n"+
                             "2.Iniciar Sesion\n"+
                             "3.Salir\n");
            opcion = scannerSesion.nextInt();
        }
        //scannerSesion.close();
        return opcion;
    }

    public static int menuSesionIniciada(){
        Scanner scannerSesion = new Scanner(System.in);
        int opcion=-1;
        while (opcion<0 || opcion>9) {
            System.out.print("\nSelecciona una de las siguientes operaciones:\n"+
                             "1.Donar\n"+
                             "2.Obtener Donantes de mi servidor\n"+
                             "3.Obtener Donantes totales\n"+
                             "4.Obtener cantidad de registrados en mi servidor\n"+
                             "5.Obtener cantidad total de registrados\n"+
                             "6.Obtener cantidad donada en de mi servidor\n"+
                             "7.Obtener cantidad total de donaciones\n"+
                             "8.Obtener cantidad total donada por mi\n"+
                             "9.Salir\n");
            opcion = scannerSesion.nextInt();
        }
        //scannerSesion.close();
        return opcion;
    }

    public static void main(String[] args){
        Scanner scanner = new Scanner(System.in);
        try{
            String nombre = "servidor";
            Registry registry = LocateRegistry.getRegistry(args[0], 1099);
            ServidorCliente_I stub = (ServidorCliente_I) registry.lookup(nombre);
            boolean valor=false, salir = false;
            int opcion=0, opcionSesion=0;
            double cantidad=0.0;
            Console console = System.console();
            String user, password;
            while (true) {
                opcion = menuSesion();
                switch (opcion) {
                    case 1:
                        valor=false;
                        while (!valor) {
                            System.out.print("\nIntroduzca el nombre de usuario: ");
                            user=scanner.nextLine();
                            char[] passwordArray = console.readPassword("Introduzca la contraseña: ");
                            password=new String(passwordArray);
                            valor=stub.registrar(user, password);
                            if (!valor) {
                                System.out.print("\nYa existe un usuario con ese nombre, porfavor introduzca otro");
                                break;
                            }else{
                                System.out.print("\nRegistrado correctamente\n");
                            }
                        }
                        break;
                    case 2:
                        valor=false;
                        while (!valor) {
                            System.out.print("\nIntroduzca el nombre de usuario: ");
                            user=scanner.nextLine();
                            char[] passwordArray = console.readPassword("Introduzca la contraseña: ");
                            password=new String(passwordArray);
                            valor=stub.iniciarSesion(user, password);
                            if (!valor) {
                                System.out.print("\nError al iniciar sesión");
                            }else{
                                System.out.println("\n¡¡¡Sesion Iniciada!!!\n");
                                ServidorCliente_I stub2 = (ServidorCliente_I) registry.lookup(stub.getMiServidor(user));
                                stub = stub2;
                                System.out.println("\nMi servidor es: "+stub2.getMiServidor(user));
                                while (true) {
                                    opcionSesion =menuSesionIniciada();
                                    switch (opcionSesion) {
                                        case 1:
                                            System.out.print("\nIntroduzca la cantidad que desea donar: ");
                                            cantidad=scanner.nextDouble();
                                            if(stub.donar(user,cantidad) && cantidad>0.0){
                                                System.out.print("\nHa donado correctamente\n");
                                            }else{
                                                System.out.print("\nNo ha podido donar\n");
                                            }
                                            break;
                                        case 2:
                                            ArrayList<String> donantes = stub.listaDonantes(user);
                                            System.out.print("\nDonantes en mi servidor\n ");
                                            if(donantes.size()>0){
                                                for(int i=0;i<donantes.size();i++){
                                                    System.out.print("\nDonante número "+i+": "+donantes.get(i));
                                                }
                                            }else{
                                                System.out.print("\nNo hay donantes aún");
                                            }
                                            break;
                                        case 3:
                                            ArrayList<String> donantesTotales = stub.listaDonantesTotal(user);
                                            System.out.print("\nDonantes totales\n ");
                                            if(donantesTotales.size()>0){
                                                for(int i=0;i<donantesTotales.size();i++){
                                                    System.out.print("\nDonante número "+i+": "+donantesTotales.get(i));
                                                }
                                            }else{
                                                System.out.print("\nNo hay donantes aún");
                                            }
                                            break;
                                        case 4:
                                            System.out.print("\nRegistrados en mi servidor: "+stub.getUsuarios());
                                            break;
                                        case 5:
                                            System.out.print("\nRegistrados en total: "+stub.getTotalUsuarios());
                                            break;
                                        case 6:
                                            System.out.print("\nEl total donado en mi servidor es: "+stub.subtotal());
                                            break;
                                        case 7:
                                            System.out.print("\nEl total donado es: "+stub.totalDonado());
                                            break;
                                        case 8:
                                            System.out.print("\nEl total donado por mi es: "+stub.totalDonadoUsuario(user));
                                            break;
                                        case 9:
                                            salir = true;
                                            break;
                                        default:
                                            break;
                                    }
                                    if(salir){
                                        salir=false;
                                        break;
                                    }
                                }
                            }

                        }
                        break;
                    case 3:
                        System.exit(0);
                        break;
                    default:
                        break;
                }
            }
        }catch(Exception e) {
            System.err.println("Excepcion: " + e.getMessage());
        }
    }
}
