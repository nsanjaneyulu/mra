import { Component, ViewEncapsulation } from '@angular/core';
import { ImportsModule } from '../../../../shared/utils/imports';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
@Component({
  selector: 'esa-create-news',
  standalone: true,
  imports: [ImportsModule, CommonModule],
  templateUrl: './create-news.component.html',
  styleUrl: './create-news.component.scss',
  encapsulation: ViewEncapsulation.Emulated
})
export class CreateNewsComponent {
  createNewsForm!: FormGroup;
  newsTypes = [
    { label: 'News', value: 'news' },
    { label: 'Blog', value: 'blog' }
  ];
  categories = [
    { label: 'Category 1', value: 'category1' },
    { label: 'Category 2', value: 'category2' }
  ];
  sources = [
    { label: 'Source 1', value: 'source1' },
    { label: 'Source 2', value: 'source2' }
  ];

  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.createNewsForm = this.fb.group({
      newsType: ['', Validators.required],
      date: ['', Validators.required],
      referenceNo: [''],
      headline: ['', Validators.required],
      category: ['', Validators.required],
      source: ['', Validators.required],
      webReference: [''],
      body: ['', Validators.required]
    });
  }

  onSave() {
    if (this.createNewsForm.valid) {
      console.log(this.createNewsForm.value);
    }
  }

  isInvalid(controlName: string) {
    const control = this.createNewsForm.get(controlName);
    return control && control.invalid && (control.dirty || control.touched);
  }
}
