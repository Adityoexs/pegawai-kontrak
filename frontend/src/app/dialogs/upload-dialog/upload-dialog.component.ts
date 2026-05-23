import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-upload-dialog',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatIconModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
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
    public readonly dialogRef: MatDialogRef<UploadDialogComponent>
  ) {}

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.selectedFile = input.files?.[0] ?? null;
  }

  upload(): void {
    if (!this.selectedFile || this.uploading) return;

    this.uploading = true;
    this.api.uploadFile(this.selectedFile).subscribe({
      next: () => {
        this.uploading = false;
        this.snack.open('File berhasil diupload.', 'OK', { duration: 2500 });
        this.dialogRef.close(true);
      },
      error: (err) => {
        this.uploading = false;
        this.snack.open(`Gagal upload: ${err.error?.message ?? 'Unknown error'}`, 'OK', { duration: 4000 });
      },
    });
  }
}
