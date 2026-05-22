import { NgClass } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatTableModule } from '@angular/material/table';
import { MatChipsModule } from '@angular/material/chips';
import { ApiService } from '../../services/api.service';
import { Cabang, Jabatan, PegawaiKontrakDTO } from '../../models/pegawai.model';

@Component({
  selector: 'app-kontrak-habis',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatTableModule,
    MatChipsModule,
    NgClass,
  ],
  templateUrl: './kontrak-habis.component.html',
  styleUrl: './kontrak-habis.component.scss',
})
export class KontrakHabisComponent implements OnInit {
  filterForm = this.fb.group({
    kodeCabang: [''],
    kodeJabatan: [''],
    hariSebelum: [30],
  });
  cabang: Cabang[] = [];
  jabatan: Jabatan[] = [];
  dataSource: PegawaiKontrakDTO[] = [];
  displayedColumns = ['kodePegawai', 'namaPegawai', 'namaCabang', 'namaJabatan', 'tanggalHabisKontrak', 'sisaHari'];

  constructor(private readonly fb: FormBuilder, private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getCabang().subscribe((res) => (this.cabang = res.data));
    this.apiService.getJabatan().subscribe((res) => (this.jabatan = res.data));
    this.loadData();
  }

  loadData(): void {
    const value = this.filterForm.value;
    this.apiService
      .getKontrakHabis(undefined, value.kodeCabang || undefined, value.kodeJabatan || undefined, value.hariSebelum ?? 30)
      .subscribe((res) => (this.dataSource = res.data));
  }

  chipClass(days: number): string {
    if (days <= 7) return 'chip-red';
    if (days <= 14) return 'chip-orange';
    return 'chip-blue';
  }
}
