import {
  Component,
  ElementRef,
  OnChanges,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ReusableSearchFilterComponent } from '../../../../core/components/reusable/reusable-search-filter/reusable-search-filter.component';
import { ReusableButtonComponent } from '../../../../core/components/reusable/reusable-button/reusable-button.component';
import {
  searchUploadNewsletterConfig,
  uploadNewsletterTableColumnsConfig,
  uploadSourceConfig,
} from './upload-newsletterDto';
import { UploadNewsletterService } from './upload-newsletter.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ReusableTableComponent } from '../../../../core/components/reusable/reusable-table/reusable-table.component';
import { ImportsModule } from '../../../../shared/utils/imports';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Buffer } from 'buffer';
import { DatePipe } from '@angular/common';
import { PdfViewerInDetailsService } from '../../../pdf-viewer-in-details/pdf-viewer-in-details.service';
@Component({
  selector: 'esa-upload-newsletter',
  standalone: true,
  templateUrl: './upload-newsletter.component.html',
  styleUrl: './upload-newsletter.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [DatePipe],
  imports: [
    ImportsModule,
    ReusableSearchFilterComponent,
    ReusableTableComponent,
    ReusableButtonComponent,
    ReusableTableComponent,
  ],
})
export class UploadNewsletterComponent implements OnInit, OnChanges {
  fields = searchUploadNewsletterConfig;
  uploadNewsletterData: any[] = [];
  filteredData: any;
  pageSize: number = 10;
  rowsPerPageOptions: number[] = [10, 20, 30];
  visible: boolean = false;
  selectedFileName: string = 'No File Chosen';
  columns = uploadNewsletterTableColumnsConfig;
  showAction: boolean = true;
  showActionDelete: boolean = true;
  uploadForm: FormGroup | any;
  fileValid: boolean = false;
  selectedFile: any;
  dragOver: boolean = false;
  base64Data: string | undefined;
  formatedDate: string | undefined;
  currentDateTime: string | undefined;
  sourceOptions: any;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  constructor(
    private router: Router,
    private fb: FormBuilder,
    private uploadNewsletterService: UploadNewsletterService,
    private commonService: CommonService,
    private pdfViewerInDetailsService: PdfViewerInDetailsService,
    private datePipe: DatePipe
  ) {}
  ngOnInit() {
    this.initFilterForm();
    this.getNewsletterData();
  }
  ngOnChanges() {}
  handleSearch(filters: any) {
    this.filteredData = this.uploadNewsletterData.filter(item => {
      let isValid = true;
      if (filters.name) {
          isValid = isValid && item.name.toLowerCase().includes(filters.name.toLowerCase());
      }
      if (filters.fromDate) {
          const itemDate = new Date(item.fileModifiedOn.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
          const fromDate = new Date(filters.fromDate);
          isValid = isValid && itemDate >= fromDate;
      }
      if (filters.toDate) {
          const itemDate = new Date(item.fileModifiedOn.replace(/(\d{2})\/(\d{2})\/(\d{4})/, "$2/$1/$3"));
          const toDate = new Date(filters.toDate);
          isValid = isValid && itemDate <= toDate;
      }
      return isValid;
  });
  }
  getNewsletterData() {
    this.sourceOptions = uploadSourceConfig;
    this.uploadNewsletterService.getNewsletterDataAsync().then((response) => {
      if (response.isSuccess && response.data != null) {
        let responseData: any[] = response.data;
        responseData = responseData.map(item => ({
          ...item,
          fileModifiedOn: this.datePipe.transform(item.fileModifiedOn, 'dd/MM/yyyy')
        }));
        this.filteredData = responseData;
        this.uploadNewsletterData = responseData;
        const uniqueSources = [
          ...new Set(responseData.map((item) => item.source)),
        ];
        const sourceOptions = uniqueSources.map((source) => ({
          label: source,
          value: source.toLowerCase().replace(/\s+/g, ''),
        }));
        const dropdown = searchUploadNewsletterConfig.find(
          (item) => item.name === 'source'
        );
        if (dropdown) {
          dropdown.options = sourceOptions;
        }
      }
    });
  }
  initFilterForm() {
    this.uploadForm = this.fb.group({
      date: [new Date(), Validators.required],
      nameOfNewsletter: ['', Validators.required],
      sourceName: ['', Validators.required],
      file: [null, [Validators.required, this.fileValidator]],
    });
  }
  fileValidator(control: any) {
    const file = control.value;
    if (file) {
      // const maxSize = 20 * 1024 * 1024; // 20MB
      // if (file.size > maxSize) {
      //   return { fileSize: true };
      // }
      if (file.type !== 'application/pdf') {
        return { fileType: true };
      }
    }
    return null;
  }
  showDialog() {
    this.resetForm();
    this.visible = true;
    this.initFilterForm();
  }

  uploadFileConfirm() {
    const uploadPDFValues = this.uploadForm.value;
    if (this.uploadForm.valid) {
      this.confirm(uploadPDFValues);
    }
  }
  confirm(uploadFormValues?: any) {
    this.visible = false;
    this.commonService.askConsent(
      'Are you sure !',
      'Do you really want to import selected PDF?',
      () => {
        this.addNewsletterData(uploadFormValues);
      }
    );
  }
  addNewsletterData(uploadFormValues?: any) {
    this.updateCurrentTime();
    const fileGet: File = this.selectedFile as File;
    fileGet.arrayBuffer().then((buf?: any) => {
      this.base64Data = Buffer.from(buf).toString('base64');
      this.uploadNewsletterService
        .addNewsletterDataync({
          fileName:
            uploadFormValues.nameOfNewsletter + '_' + this.currentDateTime,
          data: this.base64Data,
          uploadedOn: uploadFormValues.date,
          Source: uploadFormValues.sourceName,
        })
        .then((resp: any) => {
          if (resp.isSuccess) {
            this.getNewsletterData();
            this.commonService.notify(
              'Success',
              'You have successfully added a newsletter',
              'success'
            );
          }
        })
        .catch((error) => {
          this.commonService.notify(
            'Upload Error',
            'File Upload Failed',
            'error'
          );
          console.error('Error uploading document:', error);
        });
    });
  }

  updateCurrentTime() {
    const now = new Date();
    const year = now.getFullYear();
    const month = this.padNumber(now.getMonth() + 1);
    const day = this.padNumber(now.getDate());
    const hours = this.padNumber(now.getHours());
    const minutes = this.padNumber(now.getMinutes());
    const seconds = this.padNumber(now.getSeconds());
    this.currentDateTime = `${year}${month}${day}${hours}${minutes}${seconds}`;
  }

  padNumber(num: number): string {
    return num < 10 ? '0' + num : num.toString();
  }

  onFileChange(event: any) {
    this.handleFile(event.target.files[0]);
  }

  onDragOver(event: DragEvent) {
    event.preventDefault();
    this.dragOver = true;
  }

  onDragLeave(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
  }

  onDrop(event: DragEvent) {
    event.preventDefault();
    this.dragOver = false;
    const file = event.dataTransfer?.files[0];
    if (file) {
      this.handleFile(file);
    }
  }

  handleFile(file: any) {
    if (file.type !== 'application/pdf') {
      this.fileValid = true;
    } else {
      this.fileValid = false;
    }
    this.uploadForm.patchValue({
      file: file,
    });
    this.selectedFileName = file.name;
    this.selectedFile = file;
  }
  onRowSelected(rowData?: any) {
    if (rowData.actionType == 'view') {
      this.pdfViewerInDetailsService.setData({ getRequiredData: rowData?.id });
      this.router.navigate(['/newsletters/newslettersindetails']);
    } else if (rowData.actionType == 'delete') {
      this.deleteNewsLetter(rowData?.id);
    } else {
    }
  }
  resetForm() {
    this.uploadForm.reset({
      sourceName: '',
      date: '',
      nameOfNewsletter: '',
      file: null,
    });
    this.selectedFileName = '';
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }

  deleteNewsLetter(id: any) {
    if (id) {
      this.confirmDelete(id);
    }
  }

  confirmDelete(id?: any) {
    this.visible = false;
    this.commonService.askConsent(
      'Are you sure !',
      'Do you really want to delete the selected Newsletter?',
      () => {
        this.deleteNewsletter(id);
      }
    );
  }

  deleteNewsletter(id?: any) {
    this.uploadNewsletterService
      .deleteNewsLetter(id)
      .then((resp: any) => {
        if (resp && resp.isSuccess) {
          this.getNewsletterData();
          this.commonService.notify(
            'Success',
            'File has been deleted successfully',
            'success'
          );
        } else {
          this.commonService.notify(
            'Delete Error',
            'Failed to delete file',
            'error'
          );
        }
      })
      .catch((error) => {
        this.commonService.notify('Error', 'Failed to delete file', 'error');
        console.error('Error deleting newsletter:', error);
      });
  }
}
