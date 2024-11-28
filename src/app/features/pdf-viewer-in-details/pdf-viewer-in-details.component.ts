import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, Renderer2 } from '@angular/core';
import * as pdfjsLib from 'pdfjs-dist';
import { PdfViewerInDetailsService } from './pdf-viewer-in-details.service';
import { CommonService } from 'src/app/shared/services/common.service';
@Component({
  selector: 'esa-pdf-viewer-in-details',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './pdf-viewer-in-details.component.html',
  styleUrl: './pdf-viewer-in-details.component.scss',
})
export class PdfViewerInDetailsComponent implements OnInit {
  getRequiredData: any;
  @Input() salesDashboard: boolean = false;
  @Input() id: any;
  constructor(
    private renderer: Renderer2,
    private commonService: CommonService,
    private pdfViewerInDetailsService: PdfViewerInDetailsService
  ) {}
  ngOnInit() {
    if (pdfjsLib !== undefined) {
      // https://npmcdn.com/pdfjs-dist@3.11.174/build/pdf.worker.js
      pdfjsLib.GlobalWorkerOptions.workerSrc = '/assets/data/pdf.worker.js';
    }
    if (this.salesDashboard) {
      this.getSalesDashboardPDFData();
    } else {
      setTimeout(() => {
        this.getNewsletterPDFData();
        window.addEventListener('resize', () => this.getNewsletterPDFData());
      }, 1000);
    }
  }
  ngAfterViewInit() {
    document.addEventListener('keydown', this.handleKeyup);
    window.addEventListener('blur', this.onWindowBlur);
    window.addEventListener('click', this.onWindowFocus);
    window.addEventListener('keydown', this.onKeyPress);
    window.addEventListener('keyup', this.onKeyup);
    document.addEventListener('keydown', this.preventShortcuts);
  }

  ngOnDestroy() {
    document.removeEventListener('keydown', this.handleKeyup);
    window.removeEventListener('blur', this.onWindowBlur);
    window.removeEventListener('click', this.onWindowFocus);
    window.removeEventListener('keydown', this.onKeyPress);
    window.removeEventListener('keyup', this.onKeyup);
    document.removeEventListener('keydown', this.preventShortcuts);
    window.removeEventListener('resize', () => this.getNewsletterPDFData());
  }

  handleKeyup = (event: KeyboardEvent) => {
    if (event.key === 'PrintScreen') {
      this.clearClipboard();
    }
  };

  preventShortcuts = (event: KeyboardEvent) => {
    // Disable Ctrl+P (print), Ctrl+S (save), Ctrl+C (copy), and other shortcuts
    if (
      (event.ctrlKey || event.metaKey) &&
      ['p', 's', 'c'].includes(event.key.toLowerCase())
    ) {
      event.preventDefault();
      event.stopPropagation();
    }
  };

  onKeyup = (event: KeyboardEvent) => {
    if (event.key == 'PrintScreen') {
      this.onWindowBlur();
      event.preventDefault();
      event.stopPropagation();
    }
  };

  clearClipboard() {
    navigator.clipboard.writeText('');
  }
  onWindowBlur = () => {
    const mask = document.querySelector('.pdf-mask');
    if (mask) {
      this.renderer.addClass(mask, 'visible');
    }
  };

  onWindowFocus = () => {
    const mask = document.querySelector('.pdf-mask');
    if (mask) {
      this.renderer.removeClass(mask, 'visible');
    }
  };

  onKeyPress = () => {
    this.onWindowBlur();
  };
  getNewsletterPDFData() {
    const data = this.pdfViewerInDetailsService.getData();
    this.getRequiredData = data.getRequiredData;
    if (this.getRequiredData) {
      this.pdfViewerInDetailsService
        .getNewsletterpdfAsync(this.getRequiredData)
        .then(async (response) => {
          if (response.isSuccess && response.data != null) {
            const responseData = response.data;
            setTimeout(async () => {
              try {
                await this.pdfRendering(responseData);
              } catch (error) {
                console.error('Error generating PDF:', error);
              }
            }, 100);
          } else {
            this.commonService.notify('Load data', response.error!, 'error');
          }
        });
    }
  }
  async pdfRendering(responseData?: any) {
    const responseDataSet = responseData;
    let ctx: any;
    const byteCharacters = atob(responseDataSet.data);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
      byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const pdf = await pdfjsLib.getDocument(url).promise;
    const pdfViewer = document.querySelector('#pdfViewer');
    if (pdfViewer) {
      pdfViewer.innerHTML = '';
      pdfViewer.addEventListener('contextmenu', (event) =>
        event.preventDefault()
      );
      const containerWidth = pdfViewer.clientWidth;
      for (let currentPage = 1; currentPage <= pdf.numPages; currentPage++) {
        const page = await pdf.getPage(currentPage);
        const viewport = page.getViewport({ scale: 1 });
        const scale = containerWidth / viewport.width;
        const scaledViewport = page.getViewport({ scale });
        const canvas = document.createElement('canvas');
        ctx = canvas.getContext('2d');
        canvas.height = scaledViewport.height;
        canvas.width = scaledViewport.width;
        await page.render({ canvasContext: ctx, viewport: scaledViewport })
          .promise;
        pdfViewer.appendChild(canvas);
      }
    }
  }
  getSalesDashboardPDFData() {
    this.pdfViewerInDetailsService.getSalesPDFDashboardAsync(this.id).then((response) => {
      if (response.isSuccess && response.data != null) {
        const responseData = response.data;
        setTimeout(async () => {
          try {
            await this.pdfRendering(responseData);
          } catch (error) {
            console.error('Error generating PDF:', error);
          }
        }, 100);
      } else {
        this.commonService.notify('Load data', response.error!, 'error');
      }
    });
  }
}
