import { HttpEventType } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { finalize } from 'rxjs';
import { UploadedFile } from '../../models/pegawai.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [MatButtonModule, MatCardModule, MatProgressBarModule, MatSnackBarModule, MatTableModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent implements OnInit {
  selectedFile?: File;
  selectedFileName = '';
  files: UploadedFile[] = [];
  displayedColumns = ['no', 'fileName', 'uploadDate'];
  isUploading = false;
  uploadProgress = 0;

  constructor(
    private readonly apiService: ApiService,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  onFileSelected(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.selectedFile = target.files?.[0];
    this.selectedFileName = this.selectedFile?.name || '';
  }

  upload(): void {
    if (!this.selectedFile || this.isUploading) return;

    this.isUploading = true;
    this.uploadProgress = 0;

    this.apiService
      .uploadFileWithProgress(this.selectedFile)
      .pipe(
        finalize(() => {
          this.isUploading = false;
        })
      )
      .subscribe({
        next: (event) => {
          if (event.type === HttpEventType.UploadProgress && event.total) {
            this.uploadProgress = Math.round((event.loaded / event.total) * 100);
          }

          if (event.type === HttpEventType.Response) {
            this.uploadProgress = 100;
            this.selectedFile = undefined;
            this.selectedFileName = '';
            this.snackBar.open(event.body?.message || 'Upload berhasil', 'Tutup', { duration: 3000 });
            this.loadFiles();
          }
        },
        error: (error) => {
          const message = error?.error?.message || 'Upload gagal. Periksa format file dan coba lagi.';
          this.snackBar.open(message, 'Tutup', { duration: 3000 });
        },
      });
  }

  loadFiles(): void {
    this.apiService.getFiles().subscribe({
      next: (res) => (this.files = res.data),
      error: () => this.snackBar.open('Gagal memuat riwayat upload', 'Tutup', { duration: 3000 }),
    });
  }
}
