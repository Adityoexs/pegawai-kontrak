import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  totalPegawai = 0;
  totalCabang = 0;
  totalJabatan = 0;

  constructor(private readonly apiService: ApiService) {}

  ngOnInit(): void {
    this.apiService.getPegawai().subscribe((res) => (this.totalPegawai = res.data.length));
    this.apiService.getCabang().subscribe((res) => (this.totalCabang = res.data.length));
    this.apiService.getJabatan().subscribe((res) => (this.totalJabatan = res.data.length));
  }
}
