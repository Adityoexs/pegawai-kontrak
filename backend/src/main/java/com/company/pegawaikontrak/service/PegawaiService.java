package com.company.pegawaikontrak.service;

import com.company.pegawaikontrak.dto.PegawaiKontrakDTO;
import com.company.pegawaikontrak.dto.PegawaiRequestDTO;
import com.company.pegawaikontrak.entity.Cabang;
import com.company.pegawaikontrak.entity.Jabatan;
import com.company.pegawaikontrak.entity.Pegawai;
import com.company.pegawaikontrak.repository.CabangRepository;
import com.company.pegawaikontrak.repository.JabatanRepository;
import com.company.pegawaikontrak.repository.PegawaiRepository;
import java.util.List;
import org.springframework.stereotype.Service;

@Service
public class PegawaiService {
    private final PegawaiRepository pegawaiRepository;
    private final CabangRepository cabangRepository;
    private final JabatanRepository jabatanRepository;

    public PegawaiService(PegawaiRepository pegawaiRepository,
                          CabangRepository cabangRepository,
                          JabatanRepository jabatanRepository) {
        this.pegawaiRepository = pegawaiRepository;
        this.cabangRepository = cabangRepository;
        this.jabatanRepository = jabatanRepository;
    }

    public List<Pegawai> findAll() {
        return pegawaiRepository.findAll();
    }

    public Pegawai create(PegawaiRequestDTO request) {
        Pegawai pegawai = toEntity(request, new Pegawai());
        return pegawaiRepository.save(pegawai);
    }

    public Pegawai update(String kodePegawai, PegawaiRequestDTO request) {
        Pegawai existing = pegawaiRepository.findById(kodePegawai)
                .orElseThrow(() -> new IllegalArgumentException("Pegawai tidak ditemukan"));
        Pegawai updated = toEntity(request, existing);
        updated.setKodePegawai(kodePegawai);
        return pegawaiRepository.save(updated);
    }

    public void delete(String kodePegawai) {
        pegawaiRepository.deleteById(kodePegawai);
    }

    public List<PegawaiKontrakDTO> getKontrakAkanHabis(String kodePegawai, String kodeCabang, String kodeJabatan, Integer hariSebelum) {
        int hari = hariSebelum == null ? 30 : hariSebelum;
        return pegawaiRepository.getKontrakAkanHabis(kodePegawai, kodeCabang, kodeJabatan, hari)
                .stream()
                .map(this::toKontrakDto)
                .toList();
    }

    private Pegawai toEntity(PegawaiRequestDTO request, Pegawai target) {
        Cabang cabang = cabangRepository.findById(request.getKodeCabang())
                .orElseThrow(() -> new IllegalArgumentException("Cabang tidak ditemukan"));
        Jabatan jabatan = jabatanRepository.findById(request.getKodeJabatan())
                .orElseThrow(() -> new IllegalArgumentException("Jabatan tidak ditemukan"));

        target.setKodePegawai(request.getKodePegawai());
        target.setNamaPegawai(request.getNamaPegawai());
        target.setCabang(cabang);
        target.setJabatan(jabatan);
        target.setTanggalMulaiKontrak(request.getTanggalMulaiKontrak());
        target.setTanggalHabisKontrak(request.getTanggalHabisKontrak());
        return target;
    }

    private PegawaiKontrakDTO toKontrakDto(Object[] row) {
        return new PegawaiKontrakDTO(
                row[0] == null ? null : row[0].toString(),
                row[1] == null ? null : row[1].toString(),
                row[2] == null ? null : row[2].toString(),
                row[3] == null ? null : row[3].toString(),
                row[4] == null ? null : row[4].toString(),
                row[5] == null ? null : row[5].toString(),
                row[6] == null ? null : ((java.sql.Date) row[6]).toLocalDate(),
                row[7] == null ? null : ((java.sql.Date) row[7]).toLocalDate(),
                row[8] == null ? null : ((Number) row[8]).intValue()
        );
    }
}
