import { Routes } from '@angular/router';
import { DashboardComponent } from './pages/dashboard/dashboard.component';
import { PegawaiComponent } from './pages/pegawai/pegawai.component';
import { CabangComponent } from './pages/cabang/cabang.component';
import { JabatanComponent } from './pages/jabatan/jabatan.component';
import { KontrakHabisComponent } from './pages/kontrak-habis/kontrak-habis.component';
import { UploadComponent } from './pages/upload/upload.component';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'dashboard' },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'pegawai', component: PegawaiComponent },
  { path: 'cabang', component: CabangComponent },
  { path: 'jabatan', component: JabatanComponent },
  { path: 'kontrak-habis', component: KontrakHabisComponent },
  { path: 'upload', component: UploadComponent },
];
