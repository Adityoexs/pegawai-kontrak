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
@Table(name = "cabang")
public class Cabang {
    @Id
    @Column(name = "kode_cabang")
    private String kodeCabang;

    @Column(name = "nama_cabang", nullable = false)
    private String namaCabang;
}
