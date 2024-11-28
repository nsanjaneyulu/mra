import {
  Component,
  ElementRef,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { ReusableSearchFilterComponent } from '../../../../core/components/reusable/reusable-search-filter/reusable-search-filter.component';
import {
  searchSalesDispatchexcelConfig,
  SalesDispatchexcelTableColumnsConfig,
  uploadSourceConfig,
} from './upload-sales-dispatch-excelDto';
import { UploadSalesDispatchExcelService } from './upload-sales-dispatch-excel.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { ImportsModule } from '../../../../shared/utils/imports';
import { ReusableTableComponent } from '../../../../core/components/reusable/reusable-table/reusable-table.component';
import { ReusableButtonComponent } from '../../../../core/components/reusable/reusable-button/reusable-button.component';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Buffer } from 'buffer';
import { DatePipe } from '@angular/common';
import { FileDownloadService } from '../../../../shared/services/file-download.service';
import { json } from 'stream/consumers';

@Component({
  selector: 'esa-upload-sales-dispatch-excel',
  standalone: true,
  templateUrl: './upload-sales-dispatch-excel.component.html',
  styleUrl: './upload-sales-dispatch-excel.component.scss',
  encapsulation: ViewEncapsulation.Emulated,
  providers: [DatePipe],
  imports: [
    ImportsModule,
    ReusableSearchFilterComponent,
    ReusableTableComponent,
    ReusableButtonComponent,
  ],
})
export class UploadSalesDispatchExcelComponent {
  fields = searchSalesDispatchexcelConfig;
  uploadSalesDispatchExceldata: any[] = [];
  filteredData: any;
  pageSize: number = 10;
  showActionDelete: boolean = true;
  rowsPerPageOptions: number[] = [10, 20, 30];
  visible: boolean = false;
  selectedFileName: string = 'No File Chosen';
  columns = SalesDispatchexcelTableColumnsConfig;
  showAction: boolean = true;
  uploadForm: FormGroup | any;
  dragOver: boolean = false;
  fileValid: boolean = false;
  selectedFile: any;
  base64Data: string | undefined;
  formatedDate: string | undefined;
  sourceOptions: any;
  @ViewChild('fileInput') fileInput: ElementRef | undefined;
  constructor(
    private fb: FormBuilder,
    private commonService: CommonService,
    private uploadSalesDispatchExcelService: UploadSalesDispatchExcelService,
    private datePipe: DatePipe,
    private fileDownloadService: FileDownloadService
  ) {}
  ngOnInit() {

    this.initFilterForm();
    this.getSalesDispatchExcelData();
  }
  handleSearch(filters: any) {
    this.filteredData = this.uploadSalesDispatchExceldata.filter((item) => {
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
    console.log(this.filteredData);
  }
  initFilterForm() {
    this.uploadForm = this.fb.group({
      date: [new Date(), Validators.required],
      startDate: ['', Validators.required],
      endDate: ['', Validators.required],
      category: ['', Validators.required],
      nameOfSalesDispatchExcel: ['', Validators.required],
      file: ['', [Validators.required, this.fileValidator]],
    });
  }
  getSalesDispatchExcelData() {
    this.sourceOptions = uploadSourceConfig;
    this.uploadSalesDispatchExcelService
      .getSalesDispatchExceAsync()
      .then((response) => {
        if (response.isSuccess && response.data != null) {
          let responseData: any[] = response.data;
          responseData = responseData.map(item => ({
            ...item,
            uploadDate: this.datePipe.transform(item.uploadDate, 'dd/MM/yyyy'),
            startDate: this.datePipe.transform(item.startDate, 'dd/MM/yyyy'),
            endDate: this.datePipe.transform(item.endDate, 'dd/MM/yyyy')
          }));
          this.uploadSalesDispatchExceldata = responseData;
          this.filteredData = this.uploadSalesDispatchExceldata;
          // const uniqueSources = [
          //   ...new Set(responseData.map((item) => item.source)),
          // ];
          // const sourceOptions = this.sourceOptions.map((source?: any) => ({
          //   label: source,
          //   value: source.toLowerCase().replace(/\s+/g, ''),
          // }));
          const dropdown = searchSalesDispatchexcelConfig.find(
            (item) => item.name === 'category'
          );
          if (dropdown) {
            dropdown.options = this.sourceOptions;
          }
        }
      });
  }
  fileValidator(control: any) {
    const file = control.value;
    const validCombination = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    const validFileType = validCombination.includes(file?.type);
    if (file) {
      // const maxSize = 20 * 1024 * 1024; // 20MB
      // if (file.size > maxSize) {
      //   return { fileSize: true };
      // }
      if (!validFileType) {
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
        this.addSalesDispatchExcelData(uploadFormValues);
      }
    );
  }
  addSalesDispatchExcelData(uploadFormValues?: any) {
    const fileGet: File = this.selectedFile as File;
    const fileExtension = this.selectedFile.name.split('.').pop();
    const date = new Date(uploadFormValues.date);
    this.formatedDate = this.formatDate(date);
    fileGet.arrayBuffer().then((buf?: any) => {
      this.base64Data = Buffer.from(buf).toString('base64');
      this.uploadSalesDispatchExcelService
        .uploadSalesDispatchExcelsync({
          fileName:
            uploadFormValues.nameOfSalesDispatchExcel + '_' + this.formatedDate,
          data: this.base64Data,
          startDate: uploadFormValues.startDate,
          endDate: uploadFormValues.endDate,
          uploadDate: uploadFormValues.date,
          category: uploadFormValues.category,
          FileType: fileExtension,
        })
        .then((resp: any) => {
          if (resp.isSuccess) {
            this.commonService.notify(
              'Success',
              'File has been uploaded successfully',
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
    const validCombination = [
      'application/vnd.ms-excel',
      'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
    ];
    const validFileType = validCombination.includes(file?.type);
    if (!validFileType) {
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
    if (rowData.actionType == 'view') {
      this.viewSalesDispatchExcel(id);
    } else if (rowData.actionType == 'delete') {
      this.deleteSalesDispatchExcel(id);
    } else {
    }
  }
  formatDate(date: Date): string {
    const year = date.getFullYear().toString();
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    return `${year}${month}${day}${hours}${minutes}`;
  }
  resetForm() {
    this.uploadForm.reset({
      category: '',
      date: '',
      nameOfSalesDispatchExcel: '',
      startDate: '',
      endDate: '',
      file: null,
    });
    this.selectedFileName = '';
    if (this.fileInput) {
      this.fileInput.nativeElement.value = '';
    }
  }
  viewSalesDispatchExcel(id?: any) {
      this.uploadSalesDispatchExcelService
        .viewSalesDispatchExcelAsync(id)
        .then((resp: any) => {
          console.log("resp", resp);
          if (resp && resp.isSuccess) {
            this.fileDownloadService.downloadBase64File(resp.data.data, resp.data.fileName, 'xlsx');
            this.getSalesDispatchExcelData();
            this.commonService.notify(
              'Success',
              'File has been downloaded successfully',
              'success'
            );
          } else {
            this.commonService.notify(
              'Delete Error',
              'Failed to download excel',
              'error'
            );
          }
        })
        .catch((error) => {
          this.commonService.notify('Error', 'Failed to download excel', 'error');
          console.error('Error download excel:', error);
        });
  }
  deleteSalesDispatchExcel(id?: any) {
    this.uploadSalesDispatchExcelService
      .deleteSalesDispatchExcelAsync(id)
      .then((resp: any) => {
        if (resp && resp.isSuccess) {
          this.getSalesDispatchExcelData();
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
