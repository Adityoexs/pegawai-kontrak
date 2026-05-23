import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-upload-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatTooltipModule,
  ],
  templateUrl: './upload-dialog.component.html',
  styleUrl: './upload-dialog.component.scss',
})
export class UploadDialogComponent {
  selectedFile: File | null = null;
  uploading = false;

  constructor(
    private readonly api: ApiService,
    private readonly snack: MatSnackBar,
    public dialogRef: MatDialogRef<UploadDialogComponent>
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  upload(): void {
    if (!this.selectedFile) return;

    this.uploading = true;
    this.api.uploadFile(this.selectedFile).subscribe({
      next: () => {
        this.snack.open('File berhasil diunggah!', 'OK', { duration: 3000 });
        this.uploading = false;
        this.dialogRef.close(true);
      },
      error: (error) => {
        this.snack.open(`Gagal upload: ${error.error?.message ?? 'Terjadi kesalahan'}`, 'OK', { duration: 4000 });
        this.uploading = false;
      },
    });
  }
}
