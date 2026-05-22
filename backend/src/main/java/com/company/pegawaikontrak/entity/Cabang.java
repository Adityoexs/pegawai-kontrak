package com.company.pegawaikontrak.entity;

import jakarta.persistence.*;

@Entity
@Table(name = "cabang")
public class Cabang {

    @Id
    @Column(name = "kode_cabang", length = 10)
    private String kodeCabang;

    @Column(name = "nama_cabang", nullable = false, length = 100)
    private String namaCabang;

    public Cabang() {}

    public Cabang(String kodeCabang, String namaCabang) {
        this.kodeCabang = kodeCabang;
        this.namaCabang = namaCabang;
    }

    public String getKodeCabang() { return kodeCabang; }
    public void setKodeCabang(String kodeCabang) { this.kodeCabang = kodeCabang; }
    public String getNamaCabang() { return namaCabang; }
    public void setNamaCabang(String namaCabang) { this.namaCabang = namaCabang; }
}
