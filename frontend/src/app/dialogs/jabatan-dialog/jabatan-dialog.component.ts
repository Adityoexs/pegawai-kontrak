import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Jabatan } from '../../models/pegawai.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-jabatan-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './jabatan-dialog.component.html',
  styleUrl: './jabatan-dialog.component.scss',
})
export class JabatanDialogComponent implements OnInit {
  form = this.fb.group({
    kodeJabatan: ['', [Validators.required, Validators.maxLength(10)]],
    namaJabatan: ['', [Validators.required, Validators.maxLength(100)]],
  });
  isEdit = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly api: ApiService,
    private readonly snack: MatSnackBar,
    public dialogRef: MatDialogRef<JabatanDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Jabatan | null
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    if (this.data) {
      this.form.patchValue({
        kodeJabatan: this.data.kodeJabatan,
        namaJabatan: this.data.namaJabatan,
      });
      this.form.get('kodeJabatan')?.disable();
    }
  }

  save(): void {
    if (this.form.invalid) return;

    const value = this.form.getRawValue() as Jabatan;
    const request$ = this.isEdit
      ? this.api.updateJabatan(this.data!.kodeJabatan, value)
      : this.api.createJabatan(value);

    request$.subscribe({
      next: () => {
        this.snack.open(this.isEdit ? 'Jabatan berhasil diupdate' : 'Jabatan berhasil ditambah', 'OK', {
          duration: 2000,
        });
        this.dialogRef.close(true);
      },
      error: () => {
        this.snack.open('Gagal menyimpan data', 'OK', { duration: 2000 });
      },
    });
  }
}
