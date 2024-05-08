import 'package:ejercicio_clase/adn.dart';
import 'package:flutter/material.dart';
import 'package:flutter_test/flutter_test.dart';

void main(){

  test("Crear instancia de ADN no válida", (){
    //ADN adn1 = ADN("tonto");
    expect(() => ADN("tonto") ,throwsException ); //CUIDADO QUE NO HAGA EXCEPCION ANTES DE LLEGAR
  });

  test("Crear instancia de ADN válida", (){
    ADN adn = ADN("ACGT");
    expect(adn.secuencia,"ACGT" );
  });

  test("Comprobar complementarios", (){
    ADN adn = ADN("TACG");
    expect(adn.complemento(),"ATGC" );
  });

  test("Comprobar subsecuencia más larga", (){
    ADN adn1 = ADN("ACGT");
    ADN adn2 = ADN("ACGTTGCA");
    expect(ADN.subsecuenciaComunMasLarga(adn1, adn2), "ACGT");
  });

}