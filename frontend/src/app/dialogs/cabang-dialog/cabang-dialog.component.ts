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
export class CabangDialogComponent {
  private static readonly NO_LEADING_TRAILING_WHITESPACE_PATTERN = /^\S(?:.*\S)?$/;

  form = this.fb.nonNullable.group({
    kodeCabang: [
      '',
      [Validators.required, Validators.pattern(CabangDialogComponent.NO_LEADING_TRAILING_WHITESPACE_PATTERN)],
    ],
    namaCabang: [
      '',
      [Validators.required, Validators.pattern(CabangDialogComponent.NO_LEADING_TRAILING_WHITESPACE_PATTERN)],
    ],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly dialogRef: MatDialogRef<CabangDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { isEdit: boolean; cabang?: Cabang }
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
    const payload: Cabang = {
      kodeCabang: raw.kodeCabang.trim(),
      namaCabang: raw.namaCabang.trim(),
    };

    this.dialogRef.close(payload);
  }

  close(): void {
    this.dialogRef.close();
  }
}
