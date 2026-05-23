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
import { CabangDialogComponent } from '../../dialogs/cabang-dialog/cabang-dialog.component';
import { Cabang } from '../../models/pegawai.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-cabang',
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
  templateUrl: './cabang.component.html',
  styleUrl: './cabang.component.scss',
})
export class CabangComponent implements OnInit {
  columns = ['no', 'kodeCabang', 'namaCabang', 'aksi'];
  dataSource: Cabang[] = [];

  constructor(
    private readonly api: ApiService,
    private readonly dialog: MatDialog,
    private readonly snack: MatSnackBar
  ) {}

  ngOnInit(): void {
    this.load();
  }

  load(): void {
    this.api.getCabang().subscribe((r) => (this.dataSource = r.data));
  }

  openForm(cabang?: Cabang): void {
    const ref = this.dialog.open(CabangDialogComponent, {
      width: '400px',
      data: cabang ?? null,
    });
    ref.afterClosed().subscribe((res) => {
      if (res) this.load();
    });
  }

  delete(cabang: Cabang): void {
    const ref = this.dialog.open(ConfirmDialogComponent, {
      data: { title: 'Hapus Cabang', message: `Hapus cabang "${cabang.namaCabang}"?` },
    });

    ref.afterClosed().subscribe((ok) => {
      if (!ok) return;
      this.api.deleteCabang(cabang.kodeCabang).subscribe({
        next: () => {
          this.snack.open('Cabang berhasil dihapus', 'OK', { duration: 2000 });
          this.load();
        },
        error: () => this.snack.open('Gagal menghapus cabang', 'OK', { duration: 2000 }),
      });
    });
  }
}
