import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  ApiResponse,
  Cabang,
  Jabatan,
  Pegawai,
  PegawaiKontrakDTO,
  PegawaiRequest,
  UploadedFile,
} from '../models/pegawai.model';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private readonly baseUrl = 'http://localhost:8080/api';

  constructor(private readonly http: HttpClient) {}

  getCabang() {
    return this.http.get<ApiResponse<Cabang[]>>(`${this.baseUrl}/cabang`);
  }

  createCabang(payload: Cabang) {
    return this.http.post<ApiResponse<Cabang>>(`${this.baseUrl}/cabang`, payload);
  }

  updateCabang(kodeCabang: string, payload: Cabang) {
    return this.http.put<ApiResponse<Cabang>>(`${this.baseUrl}/cabang/${kodeCabang}`, payload);
  }

  deleteCabang(kodeCabang: string) {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/cabang/${kodeCabang}`);
  }

  getJabatan() {
    return this.http.get<ApiResponse<Jabatan[]>>(`${this.baseUrl}/jabatan`);
  }

  createJabatan(payload: Jabatan) {
    return this.http.post<ApiResponse<Jabatan>>(`${this.baseUrl}/jabatan`, payload);
  }

  updateJabatan(kodeJabatan: string, payload: Jabatan) {
    return this.http.put<ApiResponse<Jabatan>>(`${this.baseUrl}/jabatan/${kodeJabatan}`, payload);
  }

  deleteJabatan(kodeJabatan: string) {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/jabatan/${kodeJabatan}`);
  }

  getPegawai() {
    return this.http.get<ApiResponse<Pegawai[]>>(`${this.baseUrl}/pegawai`);
  }

  createPegawai(payload: PegawaiRequest) {
    return this.http.post<ApiResponse<Pegawai>>(`${this.baseUrl}/pegawai`, payload);
  }

  updatePegawai(kodePegawai: string, payload: PegawaiRequest) {
    return this.http.put<ApiResponse<Pegawai>>(`${this.baseUrl}/pegawai/${kodePegawai}`, payload);
  }

  deletePegawai(kodePegawai: string) {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/pegawai/${kodePegawai}`);
  }

  getKontrakHabis(
    kodePegawai?: string,
    kodeCabang?: string,
    kodeJabatan?: string,
    hariSebelum = 30
  ) {
    let params = new HttpParams().set('hariSebelum', hariSebelum);
    if (kodePegawai) params = params.set('kodePegawai', kodePegawai);
    if (kodeCabang) params = params.set('kodeCabang', kodeCabang);
    if (kodeJabatan) params = params.set('kodeJabatan', kodeJabatan);

    return this.http.get<ApiResponse<PegawaiKontrakDTO[]>>(`${this.baseUrl}/pegawai/kontrak-habis`, {
      params,
    });
  }

  uploadFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    return this.http.post<ApiResponse<UploadedFile>>(`${this.baseUrl}/files/upload`, formData);
  }

  getFiles() {
    return this.http.get<ApiResponse<UploadedFile[]>>(`${this.baseUrl}/files`);
  }
}
