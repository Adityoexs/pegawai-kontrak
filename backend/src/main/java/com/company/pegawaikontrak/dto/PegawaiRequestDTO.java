package com.company.pegawaikontrak.dto;

import java.time.LocalDate;

public class PegawaiRequestDTO {
    private String kodePegawai;
    private String namaPegawai;
    private String kodeCabang;
    private String kodeJabatan;
    private LocalDate tanggalMulaiKontrak;
    private LocalDate tanggalHabisKontrak;

    public PegawaiRequestDTO() {}

    public String getKodePegawai() { return kodePegawai; }
    public void setKodePegawai(String kodePegawai) { this.kodePegawai = kodePegawai; }
    public String getNamaPegawai() { return namaPegawai; }
    public void setNamaPegawai(String namaPegawai) { this.namaPegawai = namaPegawai; }
    public String getKodeCabang() { return kodeCabang; }
    public void setKodeCabang(String kodeCabang) { this.kodeCabang = kodeCabang; }
    public String getKodeJabatan() { return kodeJabatan; }
    public void setKodeJabatan(String kodeJabatan) { this.kodeJabatan = kodeJabatan; }
    public LocalDate getTanggalMulaiKontrak() { return tanggalMulaiKontrak; }
    public void setTanggalMulaiKontrak(LocalDate tanggalMulaiKontrak) { this.tanggalMulaiKontrak = tanggalMulaiKontrak; }
    public LocalDate getTanggalHabisKontrak() { return tanggalHabisKontrak; }
    public void setTanggalHabisKontrak(LocalDate tanggalHabisKontrak) { this.tanggalHabisKontrak = tanggalHabisKontrak; }
}
