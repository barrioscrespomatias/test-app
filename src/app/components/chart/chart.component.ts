import { CommonModule } from '@angular/common';
import {
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  NO_ERRORS_SCHEMA,
  Output,
  SimpleChanges,
} from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import * as Chart from 'chart.js';
import html2canvas from 'html2canvas';
import { NgChartjsModule } from 'ng-chartjs';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { FechaService } from 'src/app/helper/fecha/fecha.service';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
  imports:[FormsModule, CommonModule, ReactiveFormsModule, NgChartjsModule ],
  standalone:true,
  providers: [ FechaService],
  schemas: [NO_ERRORS_SCHEMA]
})
export class ChartComponent {
  constructor(private changeDetectorRef: ChangeDetectorRef, private fechaService: FechaService) {}

  @Input() data: number[] = [];
  @Input() chartsLabels: Array<any> = new Array<any>();
  @Input() title: string = '';
  @Input() type: string = '';
  @Input() chartSelector: string = '';
  @Input() dateProperty: boolean = false;

  @Output() dateRangeSelected: EventEmitter<{ desde: any; hasta: any }> =
    new EventEmitter();

  @Output() userSelected: EventEmitter<string> = new EventEmitter();

  today = new Date();
  month = this.today.getMonth();
  year = this.today.getFullYear();

  form: any;

  lineChartData: Chart.ChartDataset[] = [];
  lineChartLegend = true;
  lineChartType: any = '';
  inlinePlugin: any;
  textPlugin: any;
  lineChartOptions: any = {
    responsive: true,
    onClick: this.handleClick.bind(this),
    layout:{
      padding: 20,
    }, 
  };

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    // this.changeDetectorRef.detectChanges();
    this.IniciarChart();
  }

  handleClick(event: any, chartElement: any) {
    if (chartElement.length > 0) {
      const dataIndex = chartElement[0].index;
      const datasetIndex = chartElement[0].datasetIndex;
      this.userSelected.emit(this.chartsLabels[dataIndex]);      
    }
  }

  ngOnInit() {
    const today = new Date();
    const fourDaysAgo = new Date();
    fourDaysAgo.setDate(today.getDate() - 4);

    const firstDayMonth = this.fechaService.InicioMesActual();
    const lastDateMonth = this.fechaService.FinMesActual();

    this.form = new FormGroup({
      desde: new FormControl(firstDayMonth),
      hasta: new FormControl(lastDateMonth),
    });

    this.IniciarChart();
  }

  //#region Getters
  get desde() {
    return this.form.get('desde');
  }
  get hasta() {
    return this.form.get('hasta');
  }

  //#endregion

  IniciarChart() {
    const ctx = (document.getElementById('chartCanvas') as HTMLCanvasElement)?.getContext('2d');
    console.log(ctx)
    this.lineChartData = [
      {
        label: this.title,
        fill: false,
        tension: 0.1,
        backgroundColor: 'rgba(75,192,192,0.4)',
        borderColor: 'rgba(75,192,192,1)',
        borderCapStyle: 'butt',
        borderDash: [],
        borderDashOffset: 0.0,
        borderJoinStyle: 'miter',
        pointBorderColor: 'rgba(75,192,192,1)',
        pointBackgroundColor: '#fff',
        pointBorderWidth: 1,
        pointHoverRadius: 5,
        pointHoverBackgroundColor: 'rgba(75,192,192,1)',
        pointHoverBorderColor: 'rgba(220,220,220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 1,
        pointHitRadius: 10,
        data: this.data,
      },
    ];
    this.lineChartType = this.type;
  }

  async DescargarPDF(chartSelector: string, graphName:string) {
    const documentDefinition: any = {
      // header: `Informe... ${moment().format('DD/MM/YYYY')}`,
      content: [
        // ... (existing content)
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 10, 0, 10],
        },
        tableStyle: {
          fontSize: 8,
        },
      },
    };
    const chartContainer = document.querySelector(chartSelector);

    if (chartContainer instanceof HTMLElement) {
      try {
        const chartImage = await html2canvas(chartContainer, { scale: 2 });

        // Convertir la imagen capturada a base64
        const chartImageData = chartImage.toDataURL('image/png');

        // Agregar la imagen al contenido del PDF
        documentDefinition.content.push({ image: chartImageData, width: 500 });

        // Generar el documento PDF
        const pdfBuffer = pdfMake
          .createPdf(
            documentDefinition,
            undefined,
            undefined,
            pdfFonts.pdfMake.vfs
          )
          .getBuffer((buffer: any) => {
            // Descargar el archivo PDF
            this.savePDFFile(buffer, `${graphName}.pdf`);
          });
      } catch (error) {
        console.error('Error al capturar el gráfico como una imagen:', error);
      }
    } else {
      console.error('No se encontró el contenedor del gráfico.');
    }
  }

  savePDFFile(buffer: ArrayBuffer, fileName: string) {
    const data = new Blob([buffer], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(data);

    const link = document.createElement('a');
    link.href = url;
    link.download = fileName;
    link.click();

    // Liberar la URL del objeto
    window.URL.revokeObjectURL(url);
  }

  onDateChange() {
    var desde = this.desde?.value;
    var hasta = this.hasta?.value;

    this.dateRangeSelected.emit({ desde, hasta });
  }
}
