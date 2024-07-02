
import { Component, OnInit } from '@angular/core';


interface Card {
  imgSrc: string;
  flipped: boolean;
  solved: boolean;
  
}

@Component({
  selector: 'app-repasomodule',
  templateUrl: './repasomodule.component.html',
  styleUrls: ['./repasomodule.component.css']
})
export class RepasomoduleComponent implements OnInit {
  cards: Card[] = [];
  flippedCards: Card[] = [];
  moves: number = 0;
  startTime: number = 0;
  endTime: number = 0;
  congratulationMessage: string = '';
  navbarStatus: boolean = false;
  ngOnInit() {
    // Definir tus imágenes aquí (asegúrate de tener al menos 8 imágenes para tener 16 cartas)
    const imagePaths = [ 
    'https://i.pinimg.com/564x/02/16/2e/02162e90198b452b5c85a69e92c33a37.jpg',
    'https://i.pinimg.com/564x/47/32/52/473252d3a15db980045a625551c61f62.jpg',
    'https://i.pinimg.com/564x/28/59/97/285997d12c01c026a123bb9480388ac2.jpg',
    'https://i.pinimg.com/564x/e0/81/dc/e081dc98ced43b6586df577d401cca3a.jpg',
    'https://i.pinimg.com/564x/4f/cb/f5/4fcbf5353d902d41336fc32569c6864e.jpg',
    'https://i.pinimg.com/564x/3b/7b/c3/3b7bc346907acc3b26b1742337f2656b.jpg',
    'https://i.pinimg.com/564x/2b/cd/41/2bcd411cb8df3bfaca89271ee11fd5af.jpg',
    'https://i.pinimg.com/564x/bb/c9/03/bbc903655bb5d83d024afaf0421cd975.jpg',];
    this.cards = this.createCardPairs(imagePaths).concat(this.createCardPairs(imagePaths));
    this.shuffleCards();
    this.startTime = Date.now();
  }

  createCardPairs(imagePaths: string[]): Card[] {
    return imagePaths.map((path) => ({
      imgSrc: path,
      flipped: false,
      solved: false,
    }));
  }

  shuffleCards() {
    for (let i = this.cards.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [this.cards[i], this.cards[j]] = [this.cards[j], this.cards[i]];
    }
  }

  flipCard(card: Card) {
    if (this.flippedCards.length < 2 && !card.flipped && !card.solved) {
      card.flipped = true;
      this.flippedCards.push(card);

      if (this.flippedCards.length === 2) {
        this.moves++;
        this.checkMatch();
      }
    }
  }

  checkMatch() {
    setTimeout(() => {
      if (this.flippedCards[0].imgSrc === this.flippedCards[1].imgSrc) {
        this.flippedCards.forEach((card) => (card.solved = true));
        this.checkWin();
      } else {
        this.flippedCards.forEach((card) => (card.flipped = false));
      }
      this.flippedCards = [];
    }, 1000);
  }

  checkWin() {
    if (this.cards.every((card) => card.solved)) {
      this.endTime = Date.now();
      const elapsedTimeInSeconds = Math.floor((this.endTime - this.startTime) / 1000);
      this.congratulationMessage = `¡Felicidades! Completaste el juego en ${this.moves} movimientos y ${elapsedTimeInSeconds} segundos.`;
      this.triggerCelebration();
   
    }
  }

  triggerCelebration() {
    const confettiContainer = document.querySelector('.confetti')!;
    for (let i = 0; i < 100; i++) {
      const confetti = document.createElement('div');
      confetti.classList.add('confetti-piece');
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.animationDelay = `${Math.random() * 2}s`;
      confettiContainer.appendChild(confetti);
    }
  }
}