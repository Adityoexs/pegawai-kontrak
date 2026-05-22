package com.company.pegawaikontrak.dto;

import java.time.LocalDate;

public class PegawaiKontrakDTO {
    private String kodePegawai;
    private String namaPegawai;
    private String kodeCabang;
    private String namaCabang;
    private String kodeJabatan;
    private String namaJabatan;
    private LocalDate tanggalMulaiKontrak;
    private LocalDate tanggalHabisKontrak;
    private Integer sisaHari;

    public PegawaiKontrakDTO() {}

    public PegawaiKontrakDTO(String kodePegawai, String namaPegawai, String kodeCabang,
                              String namaCabang, String kodeJabatan, String namaJabatan,
                              LocalDate tanggalMulaiKontrak, LocalDate tanggalHabisKontrak,
                              Integer sisaHari) {
        this.kodePegawai = kodePegawai;
        this.namaPegawai = namaPegawai;
        this.kodeCabang = kodeCabang;
        this.namaCabang = namaCabang;
        this.kodeJabatan = kodeJabatan;
        this.namaJabatan = namaJabatan;
        this.tanggalMulaiKontrak = tanggalMulaiKontrak;
        this.tanggalHabisKontrak = tanggalHabisKontrak;
        this.sisaHari = sisaHari;
    }

    public String getKodePegawai() { return kodePegawai; }
    public void setKodePegawai(String kodePegawai) { this.kodePegawai = kodePegawai; }
    public String getNamaPegawai() { return namaPegawai; }
    public void setNamaPegawai(String namaPegawai) { this.namaPegawai = namaPegawai; }
    public String getKodeCabang() { return kodeCabang; }
    public void setKodeCabang(String kodeCabang) { this.kodeCabang = kodeCabang; }
    public String getNamaCabang() { return namaCabang; }
    public void setNamaCabang(String namaCabang) { this.namaCabang = namaCabang; }
    public String getKodeJabatan() { return kodeJabatan; }
    public void setKodeJabatan(String kodeJabatan) { this.kodeJabatan = kodeJabatan; }
    public String getNamaJabatan() { return namaJabatan; }
    public void setNamaJabatan(String namaJabatan) { this.namaJabatan = namaJabatan; }
    public LocalDate getTanggalMulaiKontrak() { return tanggalMulaiKontrak; }
    public void setTanggalMulaiKontrak(LocalDate tanggalMulaiKontrak) { this.tanggalMulaiKontrak = tanggalMulaiKontrak; }
    public LocalDate getTanggalHabisKontrak() { return tanggalHabisKontrak; }
    public void setTanggalHabisKontrak(LocalDate tanggalHabisKontrak) { this.tanggalHabisKontrak = tanggalHabisKontrak; }
    public Integer getSisaHari() { return sisaHari; }
    public void setSisaHari(Integer sisaHari) { this.sisaHari = sisaHari; }
}
