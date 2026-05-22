import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { Jabatan } from '../../models/pegawai.model';
import { ApiService } from '../../services/api.service';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-jabatan',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatDialogModule],
  templateUrl: './jabatan.component.html',
  styleUrl: './jabatan.component.scss',
})
export class JabatanComponent implements OnInit {
  displayedColumns = ['kodeJabatan', 'namaJabatan', 'actions'];
  dataSource: Jabatan[] = [];

  constructor(private readonly apiService: ApiService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.apiService.getJabatan().subscribe((res) => (this.dataSource = res.data));
  }

  add(): void {
    const kodeJabatan = prompt('Kode Jabatan');
    const namaJabatan = prompt('Nama Jabatan');
    if (!kodeJabatan || !namaJabatan) return;
    this.apiService.createJabatan({ kodeJabatan, namaJabatan }).subscribe(() => this.loadData());
  }

  edit(item: Jabatan): void {
    const namaJabatan = prompt('Nama Jabatan', item.namaJabatan);
    if (!namaJabatan) return;
    this.apiService.updateJabatan(item.kodeJabatan, { ...item, namaJabatan }).subscribe(() => this.loadData());
  }

  remove(item: Jabatan): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Hapus Jabatan', message: `Hapus jabatan ${item.namaJabatan}?` },
      })
      .afterClosed()
      .subscribe((ok) => {
        if (ok) this.apiService.deleteJabatan(item.kodeJabatan).subscribe(() => this.loadData());
      });
  }
}
