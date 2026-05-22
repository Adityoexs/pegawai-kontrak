package com.company.pegawaikontrak.controller;

import com.company.pegawaikontrak.dto.ApiResponse;
import com.company.pegawaikontrak.dto.PegawaiKontrakDTO;
import com.company.pegawaikontrak.dto.PegawaiRequestDTO;
import com.company.pegawaikontrak.entity.Pegawai;
import com.company.pegawaikontrak.service.PegawaiService;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/pegawai")
@CrossOrigin("*")
@RequiredArgsConstructor
public class PegawaiController {
    private final PegawaiService pegawaiService;

    @GetMapping
    public ApiResponse<List<Pegawai>> findAll() {
        return new ApiResponse<>(true, "Sukses", pegawaiService.findAll());
    }

    @PostMapping
    public ApiResponse<Pegawai> create(@RequestBody PegawaiRequestDTO request) {
        return new ApiResponse<>(true, "Pegawai berhasil dibuat", pegawaiService.create(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<Pegawai> update(@PathVariable("id") String id, @RequestBody PegawaiRequestDTO request) {
        return new ApiResponse<>(true, "Pegawai berhasil diupdate", pegawaiService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable("id") String id) {
        pegawaiService.delete(id);
        return new ApiResponse<>(true, "Pegawai berhasil dihapus", null);
    }

    @GetMapping("/kontrak-habis")
    public ApiResponse<List<PegawaiKontrakDTO>> getKontrakHabis(
            @RequestParam(required = false) String kodePegawai,
            @RequestParam(required = false) String kodeCabang,
            @RequestParam(required = false) String kodeJabatan,
            @RequestParam(required = false) Integer hariSebelum
    ) {
        return new ApiResponse<>(true, "Sukses", pegawaiService.getKontrakAkanHabis(kodePegawai, kodeCabang, kodeJabatan, hariSebelum));
    }
}
