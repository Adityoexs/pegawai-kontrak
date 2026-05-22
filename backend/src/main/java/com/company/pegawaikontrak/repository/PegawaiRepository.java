package com.company.pegawaikontrak.repository;

import com.company.pegawaikontrak.entity.Pegawai;
import java.util.List;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface PegawaiRepository extends JpaRepository<Pegawai, String> {

    @Query(value = "SELECT * FROM sp_get_pegawai_kontrak(:p_kode_pegawai, :p_kode_cabang, :p_kode_jabatan, :p_hari_sebelum)", nativeQuery = true)
    List<Object[]> getKontrakAkanHabis(
            @Param("p_kode_pegawai") String kodePegawai,
            @Param("p_kode_cabang") String kodeCabang,
            @Param("p_kode_jabatan") String kodeJabatan,
            @Param("p_hari_sebelum") Integer hariSebelum
    );
}
