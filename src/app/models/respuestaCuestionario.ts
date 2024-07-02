export class RespuestaCuestionario {
    _id?: string; // Opcional
    cuestionario: string; // ID del cuestionario
    estudiante: string; // ID del estudiante
    respuestas: {
      opcion: string; // ID de la opción
      respuesta: string;
    }[];
  
    constructor(
      cuestionario: string,
      estudiante: string,
      respuestas: { opcion: string; respuesta: string }[]
    ) {
      this.cuestionario = cuestionario;
      this.estudiante = estudiante;
      this.respuestas = respuestas;
    }
  }
  