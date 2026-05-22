package com.company.pegawaikontrak.repository;

import com.company.pegawaikontrak.entity.UploadedFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UploadedFileRepository extends JpaRepository<UploadedFile, Long> {
}
