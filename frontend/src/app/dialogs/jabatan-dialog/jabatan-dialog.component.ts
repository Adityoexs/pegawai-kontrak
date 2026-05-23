import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Jabatan } from '../../models/pegawai.model';

@Component({
  selector: 'app-jabatan-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './jabatan-dialog.component.html',
  styles: [
    `
      form {
        display: grid;
        gap: 12px;
        margin-top: 8px;
      }

      mat-form-field {
        width: 100%;
      }
    `,
  ],
})
export class JabatanDialogComponent {
  form = this.fb.group({
    kodeJabatan: ['', Validators.required],
    namaJabatan: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<JabatanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean; jabatan?: Jabatan }
  ) {
    if (data.jabatan) {
      this.form.patchValue({
        kodeJabatan: data.jabatan.kodeJabatan,
        namaJabatan: data.jabatan.namaJabatan,
      });

      if (data.isEdit) {
        this.form.controls.kodeJabatan.disable();
      }
    }
  }

  save(): void {
    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    const raw = this.form.getRawValue();
    const payload: Jabatan = {
      kodeJabatan: raw.kodeJabatan || '',
      namaJabatan: raw.namaJabatan || '',
    };

    this.dialogRef.close(payload);
  }

  close(): void {
    this.dialogRef.close();
  }
}
