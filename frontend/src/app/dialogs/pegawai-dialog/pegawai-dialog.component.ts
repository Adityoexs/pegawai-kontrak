import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { Cabang, Jabatan, Pegawai, PegawaiRequest } from '../../models/pegawai.model';

@Component({
  selector: 'app-pegawai-dialog',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
  ],
  templateUrl: './pegawai-dialog.component.html',
  styleUrl: './pegawai-dialog.component.scss',
})
export class PegawaiDialogComponent {
  form = this.fb.group({
    kodePegawai: ['', Validators.required],
    namaPegawai: ['', Validators.required],
    kodeCabang: ['', Validators.required],
    kodeJabatan: ['', Validators.required],
    tanggalMulaiKontrak: [new Date(), Validators.required],
    tanggalHabisKontrak: [new Date(), Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<PegawaiDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      pegawai?: Pegawai;
      cabang: Cabang[];
      jabatan: Jabatan[];
      isEdit: boolean;
    }
  ) {
    if (data.pegawai) {
      this.form.patchValue({
        kodePegawai: data.pegawai.kodePegawai,
        namaPegawai: data.pegawai.namaPegawai,
        kodeCabang: data.pegawai.cabang?.kodeCabang,
        kodeJabatan: data.pegawai.jabatan?.kodeJabatan,
        tanggalMulaiKontrak: new Date(data.pegawai.tanggalMulaiKontrak),
        tanggalHabisKontrak: new Date(data.pegawai.tanggalHabisKontrak),
      });
      if (data.isEdit) {
        this.form.controls.kodePegawai.disable();
      }
    }
  }

  save(): void {
    if (this.form.invalid) return;

    const raw = this.form.getRawValue();
    const payload: PegawaiRequest = {
      kodePegawai: raw.kodePegawai || '',
      namaPegawai: raw.namaPegawai || '',
      kodeCabang: raw.kodeCabang || '',
      kodeJabatan: raw.kodeJabatan || '',
      tanggalMulaiKontrak: this.toIsoDate(raw.tanggalMulaiKontrak as Date),
      tanggalHabisKontrak: this.toIsoDate(raw.tanggalHabisKontrak as Date),
    };

    this.dialogRef.close(payload);
  }

  close(): void {
    this.dialogRef.close();
  }

  private toIsoDate(date: Date): string {
    return date.toISOString().slice(0, 10);
  }
}
