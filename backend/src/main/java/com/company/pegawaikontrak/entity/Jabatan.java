package com.company.pegawaikontrak.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "jabatan")
public class Jabatan {

    @Id
    @Column(name = "kode_jabatan", length = 10)
    private String kodeJabatan;

    @Column(name = "nama_jabatan", nullable = false, length = 100)
    private String namaJabatan;

    public Jabatan() {}

    public Jabatan(String kodeJabatan, String namaJabatan) {
        this.kodeJabatan = kodeJabatan;
        this.namaJabatan = namaJabatan;
    }

    public String getKodeJabatan() { return kodeJabatan; }
    public void setKodeJabatan(String kodeJabatan) { this.kodeJabatan = kodeJabatan; }
    public String getNamaJabatan() { return namaJabatan; }
    public void setNamaJabatan(String namaJabatan) { this.namaJabatan = namaJabatan; }
}
