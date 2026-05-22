package com.company.pegawaikontrak.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.Table;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "pegawai")
public class Pegawai {
    @Id
    @Column(name = "kode_pegawai")
    private String kodePegawai;

    @Column(name = "nama_pegawai", nullable = false)
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
}
