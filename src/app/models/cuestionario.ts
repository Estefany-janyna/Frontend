export class Cuestionario {
    _id?: string;
    enunciado: string;
    opciones: Opcion[];
    tiempoLimite: number;
    puntaje: number; 

    constructor(enunciado: string, opciones: Opcion[], puntaje: number, tiempoLimite: number) {
        this.enunciado = enunciado;
        this.opciones = opciones;
        this.tiempoLimite = tiempoLimite;
        this.puntaje = puntaje;
    }
}

export class Opcion {
    _id?: string;
    contenido:  Contenido;
    esCorrecta: boolean;

    constructor(contenido: Contenido, esCorrecta: boolean) {
        this.contenido = contenido;
        this.esCorrecta = esCorrecta;
    }
}

export class Contenido {
    path: string;
    contentType: string;

    constructor(path: string, contentType: string) {
        this.path = path;
        this.contentType = contentType;
    }
}

/**Puedes usar una librería como multer en tu backend (Node.js) para manejar la carga de archivos. multer te permitirá guardar los archivos en el servidor y obtener las rutas de los archivos guardados, que luego puedes almacenar en tu base de datos. */