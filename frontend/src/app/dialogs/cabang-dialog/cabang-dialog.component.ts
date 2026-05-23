import { Component, Inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Cabang } from '../../models/pegawai.model';

@Component({
  selector: 'app-cabang-dialog',
  standalone: true,
  imports: [ReactiveFormsModule, MatDialogModule, MatButtonModule, MatFormFieldModule, MatInputModule],
  templateUrl: './cabang-dialog.component.html',
  styleUrl: './cabang-dialog.component.scss',
})
export class CabangDialogComponent {
  form = this.fb.nonNullable.group({
    kodeCabang: ['', Validators.required],
    namaCabang: ['', Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<CabangDialogComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: {
      cabang?: Cabang;
      isEdit: boolean;
    }
  ) {
    if (data.cabang) {
      this.form.patchValue({
        kodeCabang: data.cabang.kodeCabang,
        namaCabang: data.cabang.namaCabang,
      });
      if (data.isEdit) {
        this.form.controls.kodeCabang.disable();
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
      kodeCabang: raw.kodeCabang.trim(),
      namaCabang: raw.namaCabang.trim(),
    } satisfies Cabang);
  }

  close(): void {
    this.dialogRef.close();
  }
}
