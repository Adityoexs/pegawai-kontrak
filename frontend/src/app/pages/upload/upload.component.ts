import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpEventType } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { ApiService } from '../../services/api.service';
import { UploadedFile } from '../../models/pegawai.model';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatProgressBarModule,
    MatSnackBarModule,
    MatTableModule,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent implements OnInit {
  selectedFile?: File;
  files: UploadedFile[] = [];
  isUploading = false;
  uploadProgress = 0;
  displayedColumns = ['no', 'fileName', 'uploadDate'];

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
    this.uploadProgress = 0;
  }

  upload(): void {
    if (!this.selectedFile || this.isUploading) {
      return;
    }

    this.isUploading = true;
    this.uploadProgress = 0;

    this.apiService.uploadFile(this.selectedFile).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
        }

        if (event.type === HttpEventType.Response) {
          this.selectedFile = undefined;
          this.uploadProgress = 100;
          this.isUploading = false;
          this.showSuccess('File berhasil diupload');
          this.loadFiles();
        }
      },
      error: () => {
        this.isUploading = false;
        this.uploadProgress = 0;
        this.showError('Upload gagal. Periksa format file dan coba lagi.');
      },
    });
  }

  loadFiles(): void {
    this.apiService.getFiles().subscribe({
      next: (res) => (this.files = res.data),
      error: () => this.showError('Gagal memuat riwayat upload'),
    });
  }

  getRowNumber(row: UploadedFile): number {
    return this.files.findIndex((item) => item.id === row.id) + 1;
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Tutup', { duration: 3000 });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Tutup', { duration: 3000, panelClass: 'snackbar-error' });
  }
}
