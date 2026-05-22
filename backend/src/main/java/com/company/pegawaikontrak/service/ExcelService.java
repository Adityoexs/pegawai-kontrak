package com.company.pegawaikontrak.service;

import com.company.pegawaikontrak.dto.PegawaiRequestDTO;
import com.company.pegawaikontrak.entity.UploadedFile;
import com.company.pegawaikontrak.repository.UploadedFileRepository;
import java.io.IOException;
import java.io.InputStream;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.UUID;
import org.apache.poi.ss.usermodel.CellType;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.ss.usermodel.Sheet;
import org.apache.poi.ss.usermodel.Workbook;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;
import org.springframework.web.multipart.MultipartFile;

@Service
public class ExcelService {
    @Value("${file.upload-dir:./uploads}")
    private String uploadDir;

    private final PegawaiService pegawaiService;
    private final UploadedFileRepository uploadedFileRepository;

    public ExcelService(PegawaiService pegawaiService, UploadedFileRepository uploadedFileRepository) {
        this.pegawaiService = pegawaiService;
        this.uploadedFileRepository = uploadedFileRepository;
    }

    public UploadedFile uploadAndProcess(MultipartFile file) throws IOException {
        Path uploadPath = Paths.get(uploadDir).toAbsolutePath().normalize();
        Files.createDirectories(uploadPath);

        String originalName = StringUtils.hasText(file.getOriginalFilename())
                ? Paths.get(file.getOriginalFilename()).getFileName().toString()
                : "upload.xlsx";
        String safeName = originalName.replaceAll("[^a-zA-Z0-9._-]", "_");
        String storedName = UUID.randomUUID() + "-" + safeName;

        Path targetPath = uploadPath.resolve(storedName).normalize();
        if (!targetPath.startsWith(uploadPath)) {
            throw new IOException("Invalid file path");
        }

        try (InputStream in = file.getInputStream()) {
            Files.copy(in, targetPath, StandardCopyOption.REPLACE_EXISTING);
        }

        processExcel(file);

        UploadedFile uploadedFile = new UploadedFile();
        uploadedFile.setFileName(originalName);
        uploadedFile.setFilePath(targetPath.toString());
        uploadedFile.setUploadDate(LocalDateTime.now());
        return uploadedFileRepository.save(uploadedFile);
    }

    public List<UploadedFile> getUploadedFiles() {
        return uploadedFileRepository.findAll();
    }

    private void processExcel(MultipartFile file) throws IOException {
        try (InputStream in = file.getInputStream(); Workbook workbook = new XSSFWorkbook(in)) {
            Sheet sheet = workbook.getSheetAt(0);
            for (int i = 1; i <= sheet.getLastRowNum(); i++) {
                Row row = sheet.getRow(i);
                if (row == null || isBlank(row.getCell(0))) {
                    continue;
                }
                PegawaiRequestDTO request = new PegawaiRequestDTO();
                request.setKodePegawai(getString(row, 0));
                request.setNamaPegawai(getString(row, 1));
                request.setKodeCabang(getString(row, 2));
                request.setKodeJabatan(getString(row, 3));
                request.setTanggalMulaiKontrak(getDate(row, 4));
                request.setTanggalHabisKontrak(getDate(row, 5));
                pegawaiService.create(request);
            }
        }
    }

    private String getString(Row row, int cellIndex) {
        if (row.getCell(cellIndex) == null) {
            return null;
        }
        row.getCell(cellIndex).setCellType(CellType.STRING);
        return row.getCell(cellIndex).getStringCellValue();
    }

    private LocalDate getDate(Row row, int cellIndex) {
        if (row.getCell(cellIndex) == null) {
            return null;
        }
        return row.getCell(cellIndex).getLocalDateTimeCellValue().toLocalDate();
    }

    private boolean isBlank(org.apache.poi.ss.usermodel.Cell cell) {
        return cell == null || cell.getCellType() == CellType.BLANK;
    }
}
