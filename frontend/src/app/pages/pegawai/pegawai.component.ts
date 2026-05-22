import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApiService } from '../../services/api.service';
import { Cabang, Jabatan, Pegawai, PegawaiRequest } from '../../models/pegawai.model';
import { PegawaiDialogComponent } from '../../dialogs/pegawai-dialog/pegawai-dialog.component';
import { ConfirmDialogComponent } from '../../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-pegawai',
  standalone: true,
  imports: [MatButtonModule, MatTableModule, MatDialogModule],
  templateUrl: './pegawai.component.html',
  styleUrl: './pegawai.component.scss',
})
export class PegawaiComponent implements OnInit {
  displayedColumns = [
    'kodePegawai',
    'namaPegawai',
    'cabang',
    'jabatan',
    'tanggalMulaiKontrak',
    'tanggalHabisKontrak',
    'actions',
  ];
  dataSource: Pegawai[] = [];
  cabang: Cabang[] = [];
  jabatan: Jabatan[] = [];

  constructor(private readonly apiService: ApiService, private readonly dialog: MatDialog) {}

  ngOnInit(): void {
    this.loadReference();
    this.loadData();
  }

  loadReference(): void {
    this.apiService.getCabang().subscribe((res) => (this.cabang = res.data));
    this.apiService.getJabatan().subscribe((res) => (this.jabatan = res.data));
  }

  loadData(): void {
    this.apiService.getPegawai().subscribe((res) => (this.dataSource = res.data));
  }

  add(): void {
    this.openDialog(false);
  }

  edit(item: Pegawai): void {
    this.openDialog(true, item);
  }

  remove(item: Pegawai): void {
    this.dialog
      .open(ConfirmDialogComponent, {
        data: { title: 'Hapus Pegawai', message: `Hapus pegawai ${item.namaPegawai}?` },
      })
      .afterClosed()
      .subscribe((ok) => {
        if (ok) this.apiService.deletePegawai(item.kodePegawai).subscribe(() => this.loadData());
      });
  }

  private openDialog(isEdit: boolean, pegawai?: Pegawai): void {
    this.dialog
      .open(PegawaiDialogComponent, {
        data: { pegawai, cabang: this.cabang, jabatan: this.jabatan, isEdit },
      })
      .afterClosed()
      .subscribe((payload?: PegawaiRequest) => {
        if (!payload) return;
        const request$ = isEdit
          ? this.apiService.updatePegawai(pegawai!.kodePegawai, payload)
          : this.apiService.createPegawai(payload);
        request$.subscribe(() => this.loadData());
      });
  }
}
