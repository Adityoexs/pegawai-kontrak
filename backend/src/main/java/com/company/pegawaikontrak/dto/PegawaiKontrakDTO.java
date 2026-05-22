package com.company.pegawaikontrak.dto;

import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
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
}
