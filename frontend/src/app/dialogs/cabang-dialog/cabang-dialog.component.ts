import { CommonModule } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Cabang } from '../../models/pegawai.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cabang-dialog',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatDialogModule,
    MatFormFieldModule,
    MatInputModule,
  ],
  templateUrl: './cabang-dialog.component.html',
  styleUrl: './cabang-dialog.component.scss',
})
export class CabangDialogComponent implements OnInit {
  form = this.fb.group({
    kodeCabang: ['', [Validators.required, Validators.maxLength(10)]],
    namaCabang: ['', [Validators.required, Validators.maxLength(100)]],
  });
  isEdit = false;

  constructor(
    private readonly fb: FormBuilder,
    private readonly api: ApiService,
    private readonly snack: MatSnackBar,
    public dialogRef: MatDialogRef<CabangDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Cabang | null
  ) {}

  ngOnInit(): void {
    this.isEdit = !!this.data;
    if (this.data) {
      this.form.patchValue({
        kodeCabang: this.data.kodeCabang,
        namaCabang: this.data.namaCabang,
      });
      this.form.get('kodeCabang')?.disable();
    }
  }

  save(): void {
    if (this.form.invalid) return;

    const value = this.form.getRawValue() as Cabang;
    const request$ = this.isEdit
      ? this.api.updateCabang(this.data!.kodeCabang, value)
      : this.api.createCabang(value);

    request$.subscribe({
      next: () => {
        this.snack.open(this.isEdit ? 'Cabang berhasil diupdate' : 'Cabang berhasil ditambah', 'OK', {
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
