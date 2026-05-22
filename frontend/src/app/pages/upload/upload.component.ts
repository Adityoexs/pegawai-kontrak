import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { UploadedFile } from '../../models/pegawai.model';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatTableModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent implements OnInit {
  selectedFile?: File;
  files: UploadedFile[] = [];
  errorMessage = '';
  displayedColumns = ['id', 'fileName', 'filePath', 'uploadDate'];

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files?.[0];
  }

  upload(): void {
    if (!this.selectedFile) return;
    this.errorMessage = '';
    this.apiService.uploadFile(this.selectedFile).subscribe({
      next: () => {
        this.selectedFile = undefined;
        this.loadFiles();
      },
      error: () => {
        this.errorMessage = 'Upload gagal. Periksa format file dan coba lagi.';
      },
    });
  }

  loadFiles(): void {
    this.apiService.getFiles().subscribe((res) => (this.files = res.data));
  }
}
