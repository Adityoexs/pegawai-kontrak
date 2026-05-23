import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { JabatanDialogComponent } from '../../dialogs/jabatan-dialog/jabatan-dialog.component';
import { Jabatan } from '../../models/pegawai.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-jabatan',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatDialogModule,
    MatIconModule,
    MatTableModule,
    MatTooltipModule,
  ],
  templateUrl: './jabatan.component.html',
  styleUrl: './jabatan.component.scss',
})
export class JabatanComponent implements OnInit {
  columns = ['no', 'kodeJabatan', 'namaJabatan', 'aksi'];
  dataSource: Jabatan[] = [];

  constructor(
    private readonly api: ApiService,
    private readonly dialog: MatDialog,
    private readonly snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getJabatan().subscribe((r) => (this.dataSource = r.data));
  }

  openForm(jabatan?: Jabatan): void {
    const ref = this.dialog.open(JabatanDialogComponent, {
      width: '400px',
      data: jabatan ?? null,
    });
    ref.afterClosed().subscribe((res) => {
      if (res) this.load();
    });
  }

  delete(jabatan: Jabatan): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Hapus Jabatan', message: `Hapus jabatan "${jabatan.namaJabatan}"?` },
    });

    ref.afterClosed().subscribe((ok) => {
      if (!ok) return;
      this.api.deleteJabatan(jabatan.kodeJabatan).subscribe({
        next: () => {
          this.snack.open('Jabatan berhasil dihapus', 'OK', { duration: 2000 });
          this.load();
        },
        error: () => this.snack.open('Gagal menghapus jabatan', 'OK', { duration: 2000 }),
      });
    });
  }
}
