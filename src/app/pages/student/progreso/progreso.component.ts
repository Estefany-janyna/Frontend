// ES PARA PROFEOSR
// import { Component, OnInit } from '@angular/core';
// import { ProgresoService } from '../../../services/progreso.service';
// import { ActivatedRoute } from '@angular/router';

// @Component({
//   selector: 'app-progreso',
//   templateUrl: './progreso.component.html',
//   styleUrls: ['./progreso.component.css']
// })
// export class ProgresoComponent implements OnInit {
//   progreso: any[] = [];
//   estudianteId: string = '';

//   constructor(private progresoService: ProgresoService, private route: ActivatedRoute) {}

//   ngOnInit(): void {
//     this.estudianteId = this.route.snapshot.paramMap.get('id')!;
//     this.cargarProgreso();
//   }

//   cargarProgreso(): void {
//     this.progresoService.getProgresoPorEstudiante(this.estudianteId).subscribe(
//       data => this.progreso = data,
//       error => console.error(error)
//     );
//   }
// }

import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { ProgresoService } from 'src/app/services/progreso.service';
import { Chart } from 'chart.js/auto';

@Component({
  selector: 'app-progreso',
  templateUrl: './progreso.component.html',
  styleUrls: ['./progreso.component.css']
})
export class ProgresoComponent implements OnInit, OnDestroy {
  

  // progreso: any;
  // estudianteId: string = '';
  // subscriptions: Subscription[] = [];
  // chart: any;

  // constructor(private route: ActivatedRoute, private progresoService: ProgresoService) {}

  // ngOnInit(): void {
  //   this.estudianteId = this.route.snapshot.paramMap.get('id')!;
  //   this.getProgreso();
  // }

  // ngOnDestroy(): void {
  //   this.subscriptions.forEach(sub => sub.unsubscribe());
  //   if (this.chart) {
  //     this.chart.destroy();
  //   }
  // }

  // getProgreso(): void {
  //   const sub = this.progresoService.getProgresoPorEstudiante(this.estudianteId).subscribe(
  //     data => {
  //       this.progreso = data;
  //       this.createChart();
  //     },
  //     error => console.error('Error al obtener el progreso', error)
  //   );
  //   this.subscriptions.push(sub);
  // }

  // createChart(): void {
  //   const ctx = document.getElementById('progresoChart') as HTMLCanvasElement;
  //   if (ctx) {
  //     if (this.chart) {
  //       this.chart.destroy();
  //     }
  //     const puntajeTotalEstimado = 1000; // Cambia esto por el valor correcto
  //     const puntajeObtenido = this.progreso.reduce((acc: number, item: any) => acc + item.puntaje, 0);

  //     this.chart = new Chart(ctx, {
  //       type: 'doughnut',
  //       data: {
  //         labels: ['Puntaje Obtenido', 'Puntaje Restante'],
  //         datasets: [
  //           {
  //             data: [puntajeObtenido, puntajeTotalEstimado - puntajeObtenido],
  //             backgroundColor: ['#4CAF50', '#FFC107'],
  //             hoverBackgroundColor: ['#66BB6A', '#FFD54F']
  //           }
  //         ]
  //       },
  //       options: {
  //         responsive: true,
  //         maintainAspectRatio: false,
  //         plugins: {
  //           legend: {
  //             display: true,
  //             position: 'bottom'
  //           }
  //         }
  //       }
  //     });
  //   }
  // }
  // 
  
// -------------------------------------------------FUNCIONA NO BORRA


  progreso: any;
  cuestionarios: any[] = [];
  estudianteId: string = '';
  subscriptions: Subscription[] = [];
  chart: any;
  levelChart: any;

  constructor(private route: ActivatedRoute, private progresoService: ProgresoService) {}

  ngOnInit(): void {
    this.estudianteId = this.route.snapshot.paramMap.get('id')!;
    this.getProgreso();
    this.getCuestionarios();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sub => sub.unsubscribe());
    if (this.chart) {
      this.chart.destroy();
    }
    if (this.levelChart) {
      this.levelChart.destroy();
    }
  }

  getProgreso(): void {
    const sub = this.progresoService.getProgresoPorEstudiante(this.estudianteId).subscribe(
      data => {
        this.progreso = data;
        this.createProgressChart();
        this.createLevelChart();
      },
      error => console.error('Error al obtener el progreso', error)
    );
    this.subscriptions.push(sub);
  }

  getCuestionarios(): void {
    const sub = this.progresoService.getCuestionarios().subscribe(
      data => {
        this.cuestionarios = data;
        this.createLevelChart();
      },
      error => console.error('Error al obtener los cuestionarios', error)
    );
    this.subscriptions.push(sub);
  }

  createProgressChart(): void {
    const ctx = document.getElementById('progresoChart') as HTMLCanvasElement;
    if (ctx) {
      if (this.chart) {
        this.chart.destroy();
      }
      const puntajeTotalEstimado = this.cuestionarios.reduce((acc, item) => acc + item.puntaje, 0);
      const puntajeObtenido = this.progreso.reduce((acc: number, item: any) => acc + item.puntaje, 0);

      this.chart = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: ['Puntaje Obtenido', 'Puntaje Restante'],
          datasets: [
            {
              data: [puntajeObtenido, puntajeTotalEstimado - puntajeObtenido],
              backgroundColor: ['#4CAF50', '#FFC107'],
              hoverBackgroundColor: ['#66BB6A', '#FFD54F']
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: {
              display: true,
              position: 'bottom'
            }
          }
        }
      });
    }
  }

  createLevelChart(): void {
    const ctx = document.getElementById('levelChart') as HTMLCanvasElement;
    if (ctx) {
      if (this.levelChart) {
        this.levelChart.destroy();
      }

      const levels: { [key: string]: number } = {
        BASICO: 0,
        INTERMEDIO: 0,
        AVANZADO: 0
      };

      this.progreso.forEach((item: any) => {
        const nivel = item.nivel as keyof typeof levels;
        levels[nivel] += item.puntaje;
      });

      this.levelChart = new Chart(ctx, {
        type: 'bar',
        data: {
          labels: ['BASICO', 'INTERMEDIO', 'AVANZADO'],
          datasets: [
            {
              label: 'Puntaje por Nivel',
              data: [levels['BASICO'], levels['INTERMEDIO'], levels['AVANZADO']],
              backgroundColor: ['#42A5F5', '#66BB6A', '#FFA726'],
              hoverBackgroundColor: ['#64B5F6', '#81C784', '#FFB74D']
            }
          ]
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            y: {
              beginAtZero: true
            }
          },
          plugins: {
            legend: {
              display: true,
              position: 'top'
            }
          }
        }
      });
    }
  }


// HASTA AQUI ES DONDE FUNCIONA


}

