import { Component } from '@angular/core';

@Component({
  selector: 'app-modalprueba',
  templateUrl: './modalprueba.component.html',
  styleUrls: ['./modalprueba.component.css']
})
export class ModalpruebaComponent {
  navbarStatus: boolean = false;
  tarjetaSeleccionada: number | null = null;
  respuestaComprobada: boolean = false;
  mensajeRespuesta: string = '';
  mostrarBotonSaltar: boolean = true;
  mostrarBotonComprobar: boolean = true;
  mostrarBotonContinuar: boolean = false;

  esRespuestaCorrecta: boolean = false;
  mostrarModalFelicitaciones: boolean = false;
  
  mostrarBotonesFinJuego: boolean = true;
  totalSecciones: number = 11; // Cambia esto según la cantidad de secciones
  seccionActual: number = 1;

  //GESTION DE VIDAS 
  intentosFallidos: number = 0;
  maxVidas: number = 5;
  /* */

  sonidoCorrecto = new Audio('.././assets/sounds/correct.mp3'); 
  sonidoIncorrecto = new Audio('.././assets/sounds/incorrect.mp3');


  onTarjetaClick(numero: number): void {
    this.tarjetaSeleccionada = numero;
  }

// Lógica para mostrar la alerta modal en caso de respuesta incorrecta
  mostrarAlertaFallida(): void {
    alert('Has fallado. Tus vidas se reducirán.');
     this.intentosFallidos++;
    // Puedes personalizar la alerta modal o usar un modal Bootstrap si lo prefieres
    // También puedes agregar un botón para "seguir aprendiendo"
  }

  comprobarRespuesta(): void {
    // Lógica para comprobar la respuesta
    if (this.tarjetaSeleccionada !== null) {
      const esRespuestaCorrecta = this.verificarRespuesta(this.tarjetaSeleccionada);

      if (esRespuestaCorrecta) {
        this.incrementarBarraDeProgreso(10);
        this.sonidoCorrecto.play();
      }
      else {
        // En caso de respuesta incorrecta, mostrar alerta modal y reducir vidas
        // this.mostrarAlertaFallida();
        this.sonidoIncorrecto.play();
        this.intentosFallidos++;
          
        if (this.intentosFallidos >= this.maxVidas) {
            // lógica para manejar el límite de intentos fallidos
            // mostrar resultado
           this.mostrarMensajeSinVidas();
            return;
        }

      }

      

      // Muestra el mensaje en el modal
      this.mostrarMensaje(esRespuestaCorrecta ? '¡Correcto!' : '¡Incorrecto!');

      // Actualiza el estado para mostrar el mensaje y el botón Continuar
      // Oculta los botones "Comprobar" y "Saltar"

      // Muestra el botón "Continuar"
      this.respuestaComprobada = true;
      this.esRespuestaCorrecta = esRespuestaCorrecta;
      this.mostrarBotonSaltar = false; // Mostrar el botón Saltar

      // Ocultar el botón Comprobar
      this.mostrarBotonComprobar = false;

    }
  }

  mostrarMensajeSinVidas(): void {
   
    // Puedes personalizar el mensaje y subtítulo según tus necesidades
    this.respuestaComprobada = true;
    this.mostrarBotonSaltar = false;

  }


  continuar(): void {

    if (this.seccionActual < this.totalSecciones) {
      // Si hay más secciones, avanzar a la siguiente
      this.seccionActual++;
      // Lógica adicional para la siguiente sección, si es necesario
      this.mostrarBotonComprobar = true;
      this.mostrarBotonSaltar = true;
    } else {
      // Si no hay más secciones, cerrar el modal o realizar otra acción
      this.cerrarModal(); // Implementa la función según tus necesidades
    }
    // Lógica para continuar (puedes redirigir, cargar nuevas tarjetas, etc.)
    this.tarjetaSeleccionada = null; // Reinicia la selección de tarjeta
    this.respuestaComprobada = false; // Reinicia el estado de comprobación
    this.mensajeRespuesta = ''; // Reinicia el mensaje de respuesta




  }
  mostrarMensaje(mensaje: string): void {
    // Lógica para mostrar el mensaje en el footer (puedes usar un servicio o emisor de eventos)
    this.mensajeRespuesta = mensaje;
    console.log(mensaje); // Puedes quitar esto si no necesitas mostrarlo en la consola
  }


  saltar(): void {
    // Lógica para manejar el evento "Saltar"
    if (this.seccionActual < this.totalSecciones) {
      // Si hay más secciones, avanzar a la siguiente
      this.seccionActual++;
      // Lógica adicional para la siguiente sección, si es necesario
    } else {
      // Si no hay más secciones, cerrar el modal o realizar otra acción
      this.cerrarModal();
  
       // Implementa la función según tus necesidades
    }
  }
  incrementarBarraDeProgreso(porcentaje: number): void {
    const progressBar = document.querySelector('.progress-bar') as HTMLElement;
    const valorActual = parseInt(progressBar.style.width, 10) || 0;
    const nuevoValor = Math.min(100, valorActual + porcentaje);
    progressBar.style.width = nuevoValor + '%';


    if (nuevoValor === 100) {
      // Si la barra alcanza el 100%, muestra el modal de felicitaciones
      console.log('Mostrar modal de felicitaciones');
      
      this.mostrarModalFelicitaciones = true;
      this.mostrarBotonesFinJuego = false; 
    }
  }

  cerrarModal() {
    console.log('TERMINO')
    
    
  }


  verificarRespuesta(numero: number): boolean {
    // Lógica para verificar si la respuesta es correcta
    // (puedes implementar esto según tus criterios)
    return numero === 2; // Por ejemplo, la respuesta correcta es la tarjeta número 2
  }

  getCorazonesRestantes(): number[] {
      const vidasRestantes = this.maxVidas - this.intentosFallidos;
      // Asegura que el número de vidas restantes esté en el rango [0, maxVidas]
      return Array.from({ length: Math.max(0, Math.min(vidasRestantes, this.maxVidas)) });
  }

}
