import {
  Component,
  ElementRef,
  Input,
  OnInit,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ImportsModule } from '../../../shared/utils/imports';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { Router } from '@angular/router';
import { ReusableTableComponent } from '../../../core/components/reusable/reusable-table/reusable-table.component';
import { ReusableButtonComponent } from '../../../core/components/reusable/reusable-button/reusable-button.component';
import {
  searchSalesDashboardPDFConfig,
  uploadSalesDashboardPDFColumnsConfig,
  // uploadSalesDashboardPDFTableConfig,
} from './upload-sales-dashboardDto';
import { ReusableSearchFilterComponent } from '../../../core/components/reusable/reusable-search-filter/reusable-search-filter.component';
import { UploadSalesDashboardService } from './upload-sales-dashboard..service';
import { CommonService } from 'src/app/shared/services/common.service';
import { Buffer } from 'buffer';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'esa-upload-sales-dashboard',
  standalone: true,
  templateUrl: './upload-sales-dashboard.component.html',
  styleUrl: './upload-sales-dashboard.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [DatePipe],
  imports: [
    CommonModule,
    ImportsModule,
    ReactiveFormsModule,
    ReusableTableComponent,
    ReusableButtonComponent,
    ReusableSearchFilterComponent,
  ],
})
export class UploadSalesDashboardComponent implements OnInit {
  pageSize: number = 10;
  rowsPerPageOptions: number[] = [10, 20, 30];
  visible: boolean = false;
  uploadForm: FormGroup | any;
  selectedFileName: string = 'No File Chosen';
  selectedFile: any;
  @Input() uploadSalesDashboardData: any[] = [];
  filteredData: any;
  columns = uploadSalesDashboardPDFColumnsConfig;
  uploadSalesDashboardView: boolean = true;
  fields = searchSalesDashboardPDFConfig;
  fileValid: boolean = false;
  dragOver: boolean = false;
  base64Data: string | undefined;
  formatedDate: string | undefined;
  currentDateTime: string | undefined;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  constructor(
    private fb: FormBuilder,
    private router: Router,
    private uploadSalesDashboardService: UploadSalesDashboardService,
    private commonService: CommonService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.initFilterForm();
    this.getSalesDashboardData();
  }
  handleSearch(filters: any) {
    this.filteredData = this.uploadSalesDashboardData.filter((item) => {
      let isValid = true;
      if (filters.name) {
        isValid =
          isValid &&
          item.name.toLowerCase().includes(filters.name.toLowerCase());
      }
      if (filters.fromDate) {
        const itemDate = new Date(
          item.uploadDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
        );
        const fromDate = new Date(filters.fromDate);
        isValid = isValid && itemDate >= fromDate;
      }
      if (filters.toDate) {
        const itemDate = new Date(
          item.uploadDate.replace(/(\d{2})\/(\d{2})\/(\d{4})/, '$2/$1/$3')
        );
        const toDate = new Date(filters.toDate);
        isValid = isValid && itemDate <= toDate;
      }
      return isValid;
    });
  }
  getSalesDashboardData() {
    this.uploadSalesDashboardService
      .getSalesDashboardDataAsync()
      .then((response) => {
        if (response.isSuccess && response.data != null) {
          let responseData: any[] = response.data;
          responseData = responseData.map(item => ({
            ...item,
            uploadedOn: this.datePipe.transform(item.uploadedOn, 'dd/MM/yyyy')
          }));
          this.uploadSalesDashboardData = responseData;
          this.filteredData = this.uploadSalesDashboardData;
        } else {
          this.commonService.notify('Load data', response.error!, 'error');
        }
      });
  }
  initFilterForm() {
    this.uploadForm = this.fb.group({
      uploadedOn: [new Date(), Validators.required],
      nameOfsaleDashboard: ['', Validators.required],
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
      'Upload PDF',
      'Are you sure you want to import selected PDF?',
      () => {
        this.addSalesDashboardData(uploadFormValues);
      }
    );
  }
  addSalesDashboardData(uploadFormValues?: any) {
    const fileGet: File = this.selectedFile as File;
    this.updateCurrentTime();
    fileGet.arrayBuffer().then((buf?: any) => {
      this.base64Data = Buffer.from(buf).toString('base64');
      this.uploadSalesDashboardService
        .addSalesDashboardDataSync({
          fileName:
            uploadFormValues.nameOfsaleDashboard + '_' + this.currentDateTime,
          data: this.base64Data,
          uploadedOn: uploadFormValues.uploadedOn,
        })
        .then((resp: any) => {
          if (resp.isSuccess) {
            this.getSalesDashboardData();
            this.commonService.notify(
              'Success',
              'You have successfully updated the Sales Dashboard PDF',
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
    const file = event.target.files[0];
    this.handleFile(file);
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

  handleFile(file?: any) {
    // file.size > 20 * 1024 * 1024 || file.type !== 'application/pdf'
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
    const id = rowData?.id;
    if (id) {
      this.router.navigate(['/saleDashboard', id]);
    } else {
      this.router.navigate(['/saleDashboard']);
    }
  }
  resetForm() {
    this.uploadForm.reset({
      uploadedOn: '',
      nameOfsaleDashboard: '',
      file: null,
    });
    this.selectedFileName = '';
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
}
