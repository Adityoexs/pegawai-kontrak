package com.company.pegawaikontrak.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "pegawai")
public class Pegawai {

    @Id
    @Column(name = "kode_pegawai", length = 10)
    private String kodePegawai;

    @Column(name = "nama_pegawai", nullable = false, length = 100)
    private String namaPegawai;

    @ManyToOne(optional = false)
    @JoinColumn(name = "kode_cabang", nullable = false)
    private Cabang cabang;

    @ManyToOne(optional = false)
    @JoinColumn(name = "kode_jabatan", nullable = false)
    private Jabatan jabatan;

    @Column(name = "tanggal_mulai_kontrak", nullable = false)
    private LocalDate tanggalMulaiKontrak;

    @Column(name = "tanggal_habis_kontrak", nullable = false)
    private LocalDate tanggalHabisKontrak;

    public Pegawai() {}

    public Pegawai(String kodePegawai, String namaPegawai, Cabang cabang, Jabatan jabatan,
                   LocalDate tanggalMulaiKontrak, LocalDate tanggalHabisKontrak) {
        this.kodePegawai = kodePegawai;
        this.namaPegawai = namaPegawai;
        this.cabang = cabang;
        this.jabatan = jabatan;
        this.tanggalMulaiKontrak = tanggalMulaiKontrak;
        this.tanggalHabisKontrak = tanggalHabisKontrak;
    }

    public String getKodePegawai() { return kodePegawai; }
    public void setKodePegawai(String kodePegawai) { this.kodePegawai = kodePegawai; }
    public String getNamaPegawai() { return namaPegawai; }
    public void setNamaPegawai(String namaPegawai) { this.namaPegawai = namaPegawai; }
    public Cabang getCabang() { return cabang; }
    public void setCabang(Cabang cabang) { this.cabang = cabang; }
    public Jabatan getJabatan() { return jabatan; }
    public void setJabatan(Jabatan jabatan) { this.jabatan = jabatan; }
    public LocalDate getTanggalMulaiKontrak() { return tanggalMulaiKontrak; }
    public void setTanggalMulaiKontrak(LocalDate tanggalMulaiKontrak) { this.tanggalMulaiKontrak = tanggalMulaiKontrak; }
    public LocalDate getTanggalHabisKontrak() { return tanggalHabisKontrak; }
    public void setTanggalHabisKontrak(LocalDate tanggalHabisKontrak) { this.tanggalHabisKontrak = tanggalHabisKontrak; }
}
