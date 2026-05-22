package com.company.pegawaikontrak.dto;

import java.time.LocalDate;
import lombok.Data;

@Data
public class PegawaiRequestDTO {
    private String kodePegawai;
    private String namaPegawai;
    private String kodeCabang;
    private String kodeJabatan;
    private LocalDate tanggalMulaiKontrak;
    private LocalDate tanggalHabisKontrak;
}
