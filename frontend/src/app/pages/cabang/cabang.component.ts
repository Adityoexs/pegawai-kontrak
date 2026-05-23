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
    this.openFormDialog(false);
  }

  edit(item: Cabang): void {
    this.openFormDialog(true, item);
  }

  remove(item: Cabang): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Hapus Cabang', message: `Hapus cabang ${item.namaCabang}?` },
      })
      .afterClosed()
      .subscribe((ok) => {
        if (!ok) return;

        this.apiService.deleteCabang(item.kodeCabang).subscribe({
          next: (res) => {
            this.showSuccess(res.message || 'Cabang berhasil dihapus');
            this.loadData();
          },
          error: () => this.showError('Gagal menghapus cabang'),
        });
      });
  }

  private openFormDialog(isEdit: boolean, cabang?: Cabang): void {
    this.dialog
      .open(CabangDialogComponent, {
        data: { isEdit, cabang },
      })
      .afterClosed()
      .subscribe((payload?: Cabang) => {
        if (!payload) return;

        const request$ = isEdit
          ? this.apiService.updateCabang(cabang!.kodeCabang, payload)
          : this.apiService.createCabang(payload);

        request$.subscribe({
          next: (res) => {
            this.showSuccess(res.message || `Cabang berhasil ${isEdit ? 'diupdate' : 'dibuat'}`);
            this.loadData();
          },
          error: () => this.showError(`Gagal ${isEdit ? 'mengupdate' : 'membuat'} cabang`),
        });
      });
  }

  private showSuccess(message: string): void {
    this.snackBar.open(message, 'Tutup', { duration: 3000 });
  }

  private showError(message: string): void {
    this.snackBar.open(message, 'Tutup', { duration: 3000 });
  }
}
