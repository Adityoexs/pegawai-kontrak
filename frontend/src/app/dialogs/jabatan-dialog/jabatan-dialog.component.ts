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
  styleUrl: './jabatan-dialog.component.scss',
})
export class JabatanDialogComponent {
  form = this.fb.nonNullable.group({
    kodeJabatan: ['', Validators.required],
    namaJabatan: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<JabatanDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      jabatan?: Jabatan;
      isEdit: boolean;
    }
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
    this.dialogRef.close({
      kodeJabatan: raw.kodeJabatan.trim(),
      namaJabatan: raw.namaJabatan.trim(),
    } satisfies Jabatan);
  }

  close(): void {
    this.dialogRef.close();
  }
}
