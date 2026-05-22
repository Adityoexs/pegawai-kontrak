package com.company.pegawaikontrak.controller;

import com.company.pegawaikontrak.dto.ApiResponse;
import com.company.pegawaikontrak.entity.Jabatan;
import com.company.pegawaikontrak.repository.JabatanRepository;
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
@RequestMapping("/api/jabatan")
@CrossOrigin("*")
@RequiredArgsConstructor
public class JabatanController {
    private final JabatanRepository jabatanRepository;

    @GetMapping
    public ApiResponse<List<Jabatan>> findAll() {
        return new ApiResponse<>(true, "Sukses", jabatanRepository.findAll());
    }

    @PostMapping
    public ApiResponse<Jabatan> create(@RequestBody Jabatan request) {
        return new ApiResponse<>(true, "Jabatan berhasil dibuat", jabatanRepository.save(request));
    }

    @PutMapping("/{id}")
    public ApiResponse<Jabatan> update(@PathVariable("id") String id, @RequestBody Jabatan request) {
        request.setKodeJabatan(id);
        return new ApiResponse<>(true, "Jabatan berhasil diupdate", jabatanRepository.save(request));
    }

    @DeleteMapping("/{id}")
    public ApiResponse<Void> delete(@PathVariable("id") String id) {
        jabatanRepository.deleteById(id);
        return new ApiResponse<>(true, "Jabatan berhasil dihapus", null);
    }
}
