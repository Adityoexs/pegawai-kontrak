package com.company.pegawaikontrak.controller;

import com.company.pegawaikontrak.dto.ApiResponse;
import com.company.pegawaikontrak.entity.UploadedFile;
import com.company.pegawaikontrak.service.ExcelService;
import java.io.IOException;
import java.util.List;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("/api/files")
@CrossOrigin("*")
@RequiredArgsConstructor
public class FileController {
    private final ExcelService excelService;

    @PostMapping("/upload")
    public ApiResponse<UploadedFile> upload(@RequestParam("file") MultipartFile file) throws IOException {
        return new ApiResponse<>(true, "Upload sukses", excelService.uploadAndProcess(file));
    }

    @GetMapping
    public ApiResponse<List<UploadedFile>> getFiles() {
        return new ApiResponse<>(true, "Sukses", excelService.getUploadedFiles());
    }
}
