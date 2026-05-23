import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Cabang } from '../../models/pegawai.model';
import { ApiService } from '../../services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';
import { CabangDialogComponent } from '../../dialogs/cabang-dialog/cabang-dialog.component';

@Component({
  selector: 'app-cabang',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatDialogModule, MatSnackBarModule],
  templateUrl: './cabang.component.html',
  styleUrl: './cabang.component.scss',
})
export class CabangComponent implements OnInit {
  displayedColumns = ['kodeCabang', 'namaCabang', 'actions'];
  dataSource: Cabang[] = [];

  constructor(
    private readonly apiService: ApiService,
    private readonly dialog: MatDialog,
    private readonly snackBar: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getCabang().subscribe({
      next: (res) => (this.dataSource = res.data),
      error: () => this.showError('Gagal memuat data cabang'),
    });
  }

  add(): void {
    this.openDialog(false);
  }

  edit(item: Cabang): void {
    this.openDialog(true, item);
  }

  remove(item: Cabang): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Hapus Cabang', message: `Hapus cabang ${item.namaCabang}?` },
      })
      .afterClosed()
      .subscribe((ok) => {
        if (!ok) {
          return;
        }

        this.apiService.deleteCabang(item.kodeCabang).subscribe({
          next: () => {
            this.showSuccess('Cabang berhasil dihapus');
            this.loadData();
          },
          error: () => this.showError('Gagal menghapus cabang'),
        });
      });
  }

  private openDialog(isEdit: boolean, cabang?: Cabang): void {
    this.dialog
      .open(CabangDialogComponent, {
        width: '420px',
        data: { isEdit, cabang },
      })
      .afterClosed()
      .subscribe((payload?: Cabang) => {
        if (!payload) {
          return;
        }

        if (isEdit) {
          if (!cabang) {
            this.showError('Data cabang tidak ditemukan');
            return;
          }

          this.apiService.updateCabang(cabang.kodeCabang, payload).subscribe({
            next: () => {
              this.showSuccess('Cabang berhasil diperbarui');
              this.loadData();
            },
            error: () => this.showError('Gagal memperbarui cabang'),
          });
          return;
        }

        this.apiService.createCabang(payload).subscribe({
          next: () => {
            this.showSuccess('Cabang berhasil ditambahkan');
            this.loadData();
          },
          error: () => this.showError('Gagal menambah cabang'),
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
