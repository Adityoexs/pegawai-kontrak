import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Jabatan } from '../../models/pegawai.model';
import { ApiService } from '../../services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { JabatanDialogComponent } from '../../dialogs/jabatan-dialog/jabatan-dialog.component';

@Component({
  selector: 'app-jabatan',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './jabatan.component.html',
  styleUrl: './jabatan.component.scss',
})
export class JabatanComponent implements OnInit {
  displayedColumns = ['kodeJabatan', 'namaJabatan', 'actions'];
  dataSource: Jabatan[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getJabatan().subscribe({
      next: (res) => (this.dataSource = res.data),
      error: () => this.showError('Gagal memuat data jabatan'),
    });
  }

  add(): void {
    this.openDialog(false);
  }

  edit(item: Jabatan): void {
    this.openDialog(true, item);
  }

  remove(item: Jabatan): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Hapus Jabatan', message: `Hapus jabatan ${item.namaJabatan}?` },
      })
      .afterClosed()
      .subscribe((ok) => {
        if (!ok) {
          return;
        }

        this.apiService.deleteJabatan(item.kodeJabatan).subscribe({
          next: () => {
            this.showSuccess('Jabatan berhasil dihapus');
            this.loadData();
          },
          error: () => this.showError('Gagal menghapus jabatan'),
        });
      });
  }

  private openDialog(isEdit: boolean, jabatan?: Jabatan): void {
    this.dialog
      .open(JabatanDialogComponent, {
        width: '420px',
        data: { isEdit, jabatan },
      })
      .afterClosed()
      .subscribe((payload?: Jabatan) => {
        if (!payload) {
          return;
        }

        const request$ = isEdit
          ? this.apiService.updateJabatan(jabatan!.kodeJabatan, payload)
          : this.apiService.createJabatan(payload);

        request$.subscribe({
          next: () => {
            this.showSuccess(isEdit ? 'Jabatan berhasil diperbarui' : 'Jabatan berhasil ditambahkan');
            this.loadData();
          },
          error: () => this.showError(isEdit ? 'Gagal memperbarui jabatan' : 'Gagal menambah jabatan'),
        });
      });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Tutup', { duration: 3000 });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Tutup', { duration: 3000, panelClass: 'snackbar-error' });
  }
}
