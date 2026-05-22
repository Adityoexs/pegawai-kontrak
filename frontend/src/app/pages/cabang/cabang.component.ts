import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Cabang } from '../../models/pegawai.model';
import { ApiService } from '../../services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-cabang',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatDialogModule],
  templateUrl: './cabang.component.html',
  styleUrl: './cabang.component.scss',
})
export class CabangComponent implements OnInit {
  displayedColumns = ['kodeCabang', 'namaCabang', 'actions'];
  dataSource: Cabang[] = [];

  constructor(private readonly apiService: ApiService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getCabang().subscribe((res) => (this.dataSource = res.data));
  }

  add(): void {
    const kodeCabang = prompt('Kode Cabang');
    const namaCabang = prompt('Nama Cabang');
    if (!kodeCabang || !namaCabang) return;
    this.apiService.createCabang({ kodeCabang, namaCabang }).subscribe(() => this.loadData());
  }

  edit(item: Cabang): void {
    const namaCabang = prompt('Nama Cabang', item.namaCabang);
    if (!namaCabang) return;
    this.apiService.updateCabang(item.kodeCabang, { ...item, namaCabang }).subscribe(() => this.loadData());
  }

  remove(item: Cabang): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Hapus Cabang', message: `Hapus cabang ${item.namaCabang}?` },
      })
      .afterClosed()
      .subscribe((ok) => {
        if (ok) this.apiService.deleteCabang(item.kodeCabang).subscribe(() => this.loadData());
      });
  }
}
