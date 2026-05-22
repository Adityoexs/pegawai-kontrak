package com.company.pegawaikontrak.controller;

import com.company.pegawaikontrak.dto.ApiResponse;
import com.company.pegawaikontrak.entity.Cabang;
import com.company.pegawaikontrak.repository.CabangRepository;
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
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/cabang")
@CrossOrigin("*")
@RequiredArgsConstructor
public class CabangController {
    private final CabangRepository cabangRepository;

    @GetMapping
    public ApiResponse<List<Cabang>> findAll() {
        return new ApiResponse<>(true, "Sukses", cabangRepository.findAll());
    }

    @PostMapping
    public ApiResponse<Cabang> create(@RequestBody Cabang request) {
        return new ApiResponse<>(true, "Cabang berhasil dibuat", cabangRepository.save(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<Cabang> update(@PathVariable("id") String id, @RequestBody Cabang request) {
        request.setKodeCabang(id);
        return new ApiResponse<>(true, "Cabang berhasil diupdate", cabangRepository.save(request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable("id") String id) {
        cabangRepository.deleteById(id);
        return new ApiResponse<>(true, "Cabang berhasil dihapus", null);
    }
}
