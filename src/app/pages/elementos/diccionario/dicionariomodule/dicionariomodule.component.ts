import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
interface Video {
  title: string;
  url: string;
}
@Component({
  selector: 'app-dicionariomodule',
  templateUrl: './dicionariomodule.component.html',
  styleUrls: ['./dicionariomodule.component.css']
})
export class DicionariomoduleComponent {
 
  isRecursoInfoRoute: boolean = false;
  navbarStatus: boolean = false;
  
  videos: Video[] = [
    { title: 'Abeja', url: '/assets/videos/abeja_CA_bot.mp4' },
    { title: 'Aprender', url: '/assets/videos/aprender_CA_bot.mp4' },
    { title: 'Hola', url: '/assets/videos/aprender_CA_bot.mp4' }
    // Agrega más videos según sea necesario
  ];

  constructor(private route: ActivatedRoute) { }
  
  ngOnInit(): void {
    this.route.url.subscribe(url => {
      this.isRecursoInfoRoute = url.some(u => u.path === 'recursoinfo');
      console.log('isRecursoInfoRoute:', this.isRecursoInfoRoute);
    });
  }
}
