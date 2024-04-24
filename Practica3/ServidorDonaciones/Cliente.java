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
                             "\n1.Donar\n"+
                             "\n2.Obtener Donantes de mi servidor\n"+
                             "\n3.Obtener Donantes totales\n"+
                             "\n4.Obtener cantidad de registrados en mi servidor\n"+
                             "\n5.Obtener cantidad total de registrados\n"+
                             "\n6.Obtener cantidad donada en de mi servidor\n"+
                             "\n7.Obtener cantidad total de donaciones\n"+
                             "\n8.Obtener cantidad total donada por mi\n"+
                             "\n9.Salir\n");
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
                                System.out.print("\n\tYa existe un usuario con ese nombre, porfavor introduzca otro");
                                break;
                            }else{
                                System.out.print("\n\tRegistrado correctamente\n");
                            }
                        }
                        break;
                    case 2:
                        valor=false;
                        while (!valor) {
                            System.out.print("\nIntroduzca el nombre de usuario: ");
                            user=scanner.nextLine();
                            char[] passwordArray = console.readPassword("\nIntroduzca la contraseña: ");
                            password=new String(passwordArray);
                            valor=stub.iniciarSesion(user, password);
                            if (!valor) {
                                System.out.print("\n\tError al iniciar sesión\n");
                            }else{
                                System.out.println("\n\t¡¡¡Sesion Iniciada!!!\n");
                                ServidorCliente_I stub2 = (ServidorCliente_I) registry.lookup(stub.getMiServidor(user));
                                stub = stub2;
                                System.out.println("\n\t-Mi servidor es: "+stub2.getMiServidor(user)+"\n");
                                while (true) {
                                    opcionSesion = menuSesionIniciada();
                                    switch (opcionSesion) {
                                        case 1:
                                            System.out.print("\nIntroduzca la cantidad que desea donar: \n");
                                            cantidad=scanner.nextDouble();
                                            if(stub.donar(user,cantidad) && cantidad>0.0){
                                                System.out.print("\n\t-Ha donado correctamente\n");
                                            }else{
                                                System.out.print("\n\t-No ha podido donar\n");
                                            }
                                            break;
                                        case 2:
                                            ArrayList<String> donantes = stub.listaDonantes(user);
                                            System.out.print("\nDonantes en mi servidor:\n");
                                            if(donantes.size()>0){
                                                for(int i=0;i<donantes.size();i++){
                                                    System.out.print("\n\t-Donante número "+i+": "+donantes.get(i)+"\n");
                                                }
                                            }else{
                                                System.out.print("\n\t-No hay donantes aún o aun no ha donado\n");
                                            }
                                            break;
                                        case 3:
                                            ArrayList<String> donantesTotales = stub.listaDonantesTotal(user);
                                            System.out.print("\nDonantes totales:\n ");
                                            if(donantesTotales.size()>0){
                                                for(int i=0;i<donantesTotales.size();i++){
                                                    System.out.print("\n\t-Donante número "+i+": "+donantesTotales.get(i)+"\n");
                                                }
                                            }else{
                                                System.out.print("\n\t-No hay donantes aún o aun no ha donado\n");
                                            }
                                            break;
                                        case 4:
                                            System.out.print("\n\t-Registrados en mi servidor: "+stub.getUsuarios()+"\n");
                                            break;
                                        case 5:
                                            System.out.print("\n\t-Registrados en total: "+stub.getTotalUsuarios()+"\n");
                                            break;
                                        case 6:
                                            double donado = stub.subtotal(user);
                                            if(donado==-1){
                                                System.out.println("\n\t-Hasta que no haya donado no puede ver el total donado\n");
                                            }else{
                                                System.out.print("\n\t-El total donado en mi servidor es: "+donado+"\n");
                                            }
                                            break;
                                        case 7:
                                            double total = stub.totalDonado(user);
                                            if(total==-1){
                                                System.out.println("\n\t-Hasta que no haya donado no puede ver el total donado\n");
                                            }else{
                                                System.out.print("\n\t-El total donado es: "+total+"\n");
                                            }
                                            break;
                                        case 8:
                                            System.out.print("\n\t-El total donado por mi es: "+stub.totalDonadoUsuario(user)+"\n");
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
