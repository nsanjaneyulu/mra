import { Component, ViewEncapsulation } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TREE_DATA } from './upload-reportDto';
import { ImportsModule } from '../../../../shared/utils/imports';

@Component({
  selector: 'esa-upload-report',
  standalone: true,
  imports: [CommonModule, ImportsModule],
  templateUrl: './upload-report.component.html',
  styleUrl: './upload-report.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class UploadReportComponent {
  pdfBlobUrl: string | undefined;
  files = TREE_DATA;
  reports = [
    {
      category: "Market watch reports",
      subcategories: [
        {
          name: "Monthly Reports",
          reports: [
            { name: "Report 1", date: "DD/MM/YYYY" },
            { name: "Report 2", date: "DD/MM/YYYY" },
            { name: "Report 3", date: "DD/MM/YYYY" },
            { name: "Report 4", date: "DD/MM/YYYY" }
          ]
        },
        {
          name: "Weekly Reports",
          reports: [
            { name: "Report 1", date: "DD/MM/YYYY" },
            { name: "Report 2", date: "DD/MM/YYYY" },
            { name: "Report 3", date: "DD/MM/YYYY" }
          ]
        }
      ]
    },
    {
      category: "Rebar & Wire Rod Internal Study report",
      subcategories: [
        {
          name: "Monthly Reports",
          reports: [
            { name: "Report 1", date: "DD/MM/YYYY" },
            { name: "Report 2", date: "DD/MM/YYYY" }
          ]
        }
      ]
    }
  ];
  ngOnInit() {
    const pdfData = 'https://pdfobject.com/pdf/sample.pdf'; // Your base64 encoded PDF data
    const blob = this.base64ToBlob(pdfData.split(',')[1], 'application/pdf');
    this.pdfBlobUrl = URL.createObjectURL(blob);
  }
  base64ToBlob(base64: string, type: string) {
    const binary = atob(base64);
    const array = [];
    for (let i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: type });
  }
}
