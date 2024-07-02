import { Component } from '@angular/core';

@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.css']
})
export class LandingPageComponent {
  // Propiedad para rastrear si el tema es oscuro
  isDarkTheme = false;

  // Método para alternar entre temas
  toggleTheme(): void {
    this.isDarkTheme = !this.isDarkTheme; // Cambia el estado del tema
    if (this.isDarkTheme) {
      document.body.classList.add('dark-theme'); // Aplica el tema oscuro
      document.body.classList.remove('light-theme'); // Remueve el tema claro
    } else {
      document.body.classList.add('light-theme'); // Aplica el tema claro
      document.body.classList.remove('dark-theme'); // Remueve el tema oscuro
    }
  }
}
