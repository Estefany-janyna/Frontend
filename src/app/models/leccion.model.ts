
export class Leccion {
    _id?: string;
    titulo: string;
    descripcion: string;
    portada: string;
    creador: Usuario;
    tiempoEstimado: number;
    numeroVidas: number;
    puntajeTotalEstimado: number;
    nivel: string;
    upload: boolean;
    CuestionarioIds: Cuestionario[];

    constructor(
        titulo: string,
        descripcion: string,
        portada: string,
        creador: Usuario,
        tiempoEstimado: number,
        numeroVidas: number,
        puntajeTotalEstimado: number,
        nivel: string,
        upload: boolean,
        CuestionarioIds: Cuestionario[]
    ) {
        this.titulo = titulo;
        this.descripcion = descripcion;
        this.portada = portada;
        this.creador = creador;
        this.tiempoEstimado = tiempoEstimado;
        this.numeroVidas = numeroVidas;
        this.puntajeTotalEstimado = puntajeTotalEstimado;
        this.nivel = nivel;
        this.upload = upload;
        this.CuestionarioIds = CuestionarioIds;
    }
}

export class Usuario {
    _id?: string;
    name: string;
    surname: string;
    username: string;
    email: string;
    phone: number;
    roles: string[];
    blocked: boolean;
    createdAt?: Date;
    updatedAt?: Date;

    constructor(
        name: string,
        surname: string,
        username: string,
        email: string,
        phone: number,
        roles: string[],
        blocked: boolean
    ) {
        this.name = name;
        this.surname = surname;
        this.username = username;
        this.email = email;
        this.phone = phone;
        this.roles = roles;
        this.blocked = blocked;
    }
}

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
    contenido: Contenido;
    esCorrecta: boolean;
    cuestionarioId?: string; 

    constructor(contenido: Contenido, esCorrecta: boolean, cuestionarioId?: string) {
        this.contenido = contenido;
        this.esCorrecta = esCorrecta;
        this.cuestionarioId = cuestionarioId;
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
