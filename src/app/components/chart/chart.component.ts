import { Component, EventEmitter, Input, Output } from '@angular/core';
import * as Chart from 'chart.js';
import html2canvas from 'html2canvas';
import * as moment from 'moment';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent {

  @Input() data: number[] = [];
  @Input() chartsLabels: Array<any> = new Array<any>;
  @Input() title: string = '';
  @Input() type: string = '';

  lineChartData: Chart.ChartDataset[] = [];
  lineChartLegend = true;
  lineChartType: any = '';
  inlinePlugin: any;
  textPlugin: any;
  lineChartOptions: any = {
    responsive: true,
  };

  ngOnInit() {
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

    this.textPlugin = [
      {
        id: 'textPlugin',
        beforeDraw(chart: any): any {
          const width = chart.width;
          const height = chart.height;
          const ctx = chart.ctx;
          ctx.restore();
          const fontSize = (height / 114).toFixed(2);
          ctx.font = `${fontSize}em sans-serif`;
          ctx.textBaseline = 'middle';
          const text = 'Text Plugin';
          const textX = Math.round((width - ctx.measureText(text).width) / 2);
          const textY = height / 2;
          ctx.fillText(text, textX, textY);
          ctx.save();
        },
      },
    ];

    this.inlinePlugin = this.textPlugin;
    this.lineChartType = this.type;
  }

  async DescargarPDF() {
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
    const chartContainer = document.querySelector('.chart-container');
  
    if (chartContainer instanceof HTMLElement) {
      try {
        const chartImage = await html2canvas(chartContainer, { scale: 2 });
  
        // Convertir la imagen capturada a base64
        const chartImageData = chartImage.toDataURL('image/png');
  
        // Agregar la imagen al contenido del PDF
        documentDefinition.content.push({ image: chartImageData, width: 500 });
  
        // Generar el documento PDF
        const pdfBuffer = pdfMake
          .createPdf(documentDefinition, undefined, undefined, pdfFonts.pdfMake.vfs)
          .getBuffer((buffer: any) => {
            // Descargar el archivo PDF
            this.savePDFFile(buffer, 'grafico.pdf');
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
}