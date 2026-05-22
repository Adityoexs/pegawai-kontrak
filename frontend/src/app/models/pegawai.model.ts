export interface Cabang {
  kodeCabang: string;
  namaCabang: string;
}

export interface Jabatan {
  kodeJabatan: string;
  namaJabatan: string;
}

export interface Pegawai {
  kodePegawai: string;
  namaPegawai: string;
  cabang: Cabang;
  jabatan: Jabatan;
  tanggalMulaiKontrak: string;
  tanggalHabisKontrak: string;
}

export interface PegawaiRequest {
  kodePegawai: string;
  namaPegawai: string;
  kodeCabang: string;
  kodeJabatan: string;
  tanggalMulaiKontrak: string;
  tanggalHabisKontrak: string;
}

export interface PegawaiKontrakDTO {
  kodePegawai: string;
  namaPegawai: string;
  kodeCabang: string;
  namaCabang: string;
  kodeJabatan: string;
  namaJabatan: string;
  tanggalMulaiKontrak: string;
  tanggalHabisKontrak: string;
  sisaHari: number;
}

export interface UploadedFile {
  id: number;
  fileName: string;
  filePath: string;
  uploadDate: string;
}

export interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}
