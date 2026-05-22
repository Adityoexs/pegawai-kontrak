# Pegawai Kontrak Monorepo

## Struktur

```text
pegawai-kontrak/
├── frontend/        # Angular + Angular Material
├── backend/         # Java Spring Boot
└── database/        # PostgreSQL scripts
```

## 1) Setup Database PostgreSQL

1. Buat database:
   ```sql
   CREATE DATABASE pegawai_db;
   ```
2. Jalankan script:
   ```bash
   psql -U postgres -d pegawai_db -f database/schema.sql
   ```

## 2) Jalankan Backend Spring Boot

```bash
cd backend
mvn spring-boot:run
```

Backend akan berjalan di `http://localhost:8080`.

## 3) Jalankan Frontend Angular

```bash
cd frontend
npm install
npm start
```

Frontend akan berjalan di `http://localhost:4200`.

## 4) API Endpoints

| Method | Endpoint | Deskripsi |
|---|---|---|
| GET | `/api/cabang` | List cabang |
| POST | `/api/cabang` | Tambah cabang |
| PUT | `/api/cabang/{id}` | Update cabang |
| DELETE | `/api/cabang/{id}` | Hapus cabang |
| GET | `/api/jabatan` | List jabatan |
| POST | `/api/jabatan` | Tambah jabatan |
| PUT | `/api/jabatan/{id}` | Update jabatan |
| DELETE | `/api/jabatan/{id}` | Hapus jabatan |
| GET | `/api/pegawai` | List pegawai |
| POST | `/api/pegawai` | Tambah pegawai |
| PUT | `/api/pegawai/{id}` | Update pegawai |
| DELETE | `/api/pegawai/{id}` | Hapus pegawai |
| GET | `/api/pegawai/kontrak-habis` | Pegawai kontrak akan habis |
| POST | `/api/files/upload` | Upload file Excel |
| GET | `/api/files` | List riwayat upload |
