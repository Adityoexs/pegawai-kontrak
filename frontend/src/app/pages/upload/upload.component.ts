import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { UploadedFile } from '../../models/pegawai.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressBarModule,
    MatTableModule,
  ],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent implements OnInit {
  columns = ['no', 'fileName', 'uploadDate'];
  files: UploadedFile[] = [];
  uploading = false;
  selectedFile: File | null = null;

  constructor(
    private readonly api: ApiService,
    private readonly snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  upload(): void {
    if (!this.selectedFile) return;

    this.uploading = true;
    this.api.uploadFile(this.selectedFile).subscribe({
      next: () => {
        this.snack.open('File berhasil diunggah & diproses!', 'OK', { duration: 3000 });
        this.uploading = false;
        this.selectedFile = null;
        this.loadFiles();
      },
      error: (err) => {
        this.snack.open(`Gagal upload: ${err.error?.message ?? 'Unknown error'}`, 'OK', { duration: 4000 });
        this.uploading = false;
      },
    });
  }

  loadFiles(): void {
    this.api.getFiles().subscribe((r) => (this.files = r.data));
  }
}
