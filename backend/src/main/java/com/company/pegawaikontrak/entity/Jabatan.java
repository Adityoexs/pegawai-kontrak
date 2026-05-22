package com.company.pegawaikontrak.entity;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
@Table(name = "jabatan")
public class Jabatan {
    @Id
    @Column(name = "kode_jabatan")
    private String kodeJabatan;

    @Column(name = "nama_jabatan", nullable = false)
    private String namaJabatan;
}
