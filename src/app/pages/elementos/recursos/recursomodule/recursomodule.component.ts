import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface Card {
  title: string;
  subtitle?: string;
  description: string;
  imageUrl: string;
}

@Component({
  selector: 'app-recursomodule',
  templateUrl: './recursomodule.component.html',
  styleUrls: ['./recursomodule.component.css']
})
export class RecursomoduleComponent implements OnInit {

  isRecursoInfoRoute: boolean = false;
  zindex = 10;
  navbarStatus: boolean = false;

  cards: Card[] = [
    {
      title: 'ABC de LS 👍',
      description: 'Enseñar el abecedario manual es una parte fundamental de cualquier curso de LSP. Cada letra se representa mediante una configuración específica de las manos.',
      imageUrl: 'https://i.pinimg.com/564x/39/f2/74/39f2749b7da17ec1dfac8b292aaad036.jpg'
    },
    {
      title: 'Colores en LSP',
      description: 'Similar al abecedario, los colores se expresan mediante gestos y movimientos de las manos. Cada color tiene su propia representación visual en LSP.',
      imageUrl: 'https://i.pinimg.com/564x/22/9b/4f/229b4fb8fada182a3f02af704e27c35b.jpg'
    },
    {
      title: 'Números en LSP',
      description: 'La enseñanza de números es esencial para la comunicación en LSP. Se enseñan los gestos y las señas asociadas con cada número.',
      imageUrl: 'https://i.pinimg.com/564x/0c/ec/95/0cec958328bfe6dba355806fb02417a6.jpg'
    },
    {
      title: 'Expresiones Faciales y Corporales',
      description: 'Un aspecto importante de la LSP es el uso de expresiones faciales y corporales para transmitir matices emocionales y contextuales en la comunicación.',
      imageUrl: 'https://i.pinimg.com/564x/12/98/58/129858051c7aee17eafc3aaf8e1fdb5a.jpg'
    },
    {
      title: 'Situaciones Prácticas',
      description: 'Los cursos suelen incorporar situaciones prácticas para que los estudiantes apliquen lo que han aprendido en contextos del mundo real.',
      imageUrl: 'https://i.pinimg.com/564x/c1/9b/9f/c19b9fd4118719f5a147dcea993ac388.jpg'
    },
    {
      title: 'Cultura Sorda y Costumbres',
      description: 'Además del aspecto lingüístico, se aborda la cultura sorda y las costumbres asociadas.',
      imageUrl: 'https://i.pinimg.com/564x/d8/a1/73/d8a1737e58fc99759fafdfcc06de1130.jpg'
    },
    {
      title: 'Curso de Interpretación en Lengua de Señas',
      description: 'Enfoque en las habilidades de interpretación entre el lenguaje hablado y el lenguaje de señas.',
      imageUrl: 'https://i.pinimg.com/564x/09/26/64/0926646f0101ac56f044e4626348a4df.jpg'
    },
    {
      title: 'Palabras y Frases Comunes',
      description: 'Este curso enseña las palabras y frases más comunes en la LSP, esenciales para la comunicación diaria.',
      imageUrl: 'https://i.pinimg.com/564x/bd/15/24/bd15242c8b51e53f9867040e9894a9ab.jpg'
    },
    {
      title: 'Curso Intermedio de Lengua de Señas',
      description: 'Desarrollo de habilidades más avanzadas en LSP, incluyendo la conversación fluida y la expresión de ideas complejas.',
      imageUrl: 'https://i.pinimg.com/564x/12/cc/70/12cc700db9e975e9b587a59262e589ae.jpg'
    }
  ];
  

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.isRecursoInfoRoute = url.some(u => u.path === 'recursoinfo');
    });
  }

  toggleCard(event: Event) {
    event.preventDefault();
    const target = event.currentTarget as HTMLElement;
    const isShowing = target.classList.contains('show');
    const cardsContainer = document.querySelector('.cards') as HTMLElement;
    const cards = Array.from(cardsContainer.querySelectorAll('.card'));

    cards.forEach(card => card.classList.remove('show'));

    if (isShowing) {
      cardsContainer.classList.remove('showing');
    } else {
      cardsContainer.classList.add('showing');
      target.style.zIndex = `${this.zindex++}`;
      target.classList.add('show');
    }
  }
}
