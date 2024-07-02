export class Diccionario {
    _id?: string;
    title: string;
    description: string;
    imageUrl: string;

    constructor(title: string, description: string, imageUrl: string) {
        this.title = title;
        this.description = description;
        this.imageUrl = imageUrl;
    }
}
