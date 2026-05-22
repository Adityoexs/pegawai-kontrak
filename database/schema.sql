CREATE TABLE IF NOT EXISTS cabang (
    kode_cabang VARCHAR(10) PRIMARY KEY,
    nama_cabang VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS jabatan (
    kode_jabatan VARCHAR(10) PRIMARY KEY,
    nama_jabatan VARCHAR(100) NOT NULL
);

CREATE TABLE IF NOT EXISTS pegawai (
    kode_pegawai VARCHAR(10) PRIMARY KEY,
    nama_pegawai VARCHAR(100) NOT NULL,
    kode_cabang VARCHAR(10) NOT NULL REFERENCES cabang(kode_cabang),
    kode_jabatan VARCHAR(10) NOT NULL REFERENCES jabatan(kode_jabatan),
    tanggal_mulai_kontrak DATE NOT NULL,
    tanggal_habis_kontrak DATE NOT NULL
);

CREATE TABLE IF NOT EXISTS uploaded_files (
    id SERIAL PRIMARY KEY,
    file_name VARCHAR(255) NOT NULL,
    file_path VARCHAR(500) NOT NULL,
    upload_date TIMESTAMP DEFAULT NOW()
);

CREATE OR REPLACE FUNCTION sp_get_pegawai_kontrak(
    p_kode_pegawai VARCHAR DEFAULT NULL,
    p_kode_cabang VARCHAR DEFAULT NULL,
    p_kode_jabatan VARCHAR DEFAULT NULL,
    p_hari_sebelum INT DEFAULT 30
)
RETURNS TABLE (
    kode_pegawai VARCHAR,
    nama_pegawai VARCHAR,
    kode_cabang VARCHAR,
    nama_cabang VARCHAR,
    kode_jabatan VARCHAR,
    nama_jabatan VARCHAR,
    tanggal_mulai_kontrak DATE,
    tanggal_habis_kontrak DATE,
    sisa_hari INT
)
LANGUAGE plpgsql
AS $$
DECLARE
    v_query TEXT;
    v_where TEXT := ' WHERE 1=1';
BEGIN
    v_query :=
        'SELECT p.kode_pegawai,
                p.nama_pegawai,
                c.kode_cabang,
                c.nama_cabang,
                j.kode_jabatan,
                j.nama_jabatan,
                p.tanggal_mulai_kontrak,
                p.tanggal_habis_kontrak,
                (p.tanggal_habis_kontrak - CURRENT_DATE)::INT AS sisa_hari
         FROM pegawai p
         JOIN cabang c ON c.kode_cabang = p.kode_cabang
         JOIN jabatan j ON j.kode_jabatan = p.kode_jabatan';

    IF p_kode_pegawai IS NOT NULL AND p_kode_pegawai <> '' THEN
        v_where := v_where || format(' AND p.kode_pegawai = %L', p_kode_pegawai);
    END IF;

    IF p_kode_cabang IS NOT NULL AND p_kode_cabang <> '' THEN
        v_where := v_where || format(' AND p.kode_cabang = %L', p_kode_cabang);
    END IF;

    IF p_kode_jabatan IS NOT NULL AND p_kode_jabatan <> '' THEN
        v_where := v_where || format(' AND p.kode_jabatan = %L', p_kode_jabatan);
    END IF;

    IF p_hari_sebelum IS NOT NULL THEN
        v_where := v_where || format(
            ' AND p.tanggal_habis_kontrak <= CURRENT_DATE + INTERVAL ''%s day''',
            p_hari_sebelum
        );
    END IF;

    v_query := v_query || v_where || ' ORDER BY p.tanggal_habis_kontrak ASC';

    RETURN QUERY EXECUTE v_query;
END;
$$;

INSERT INTO cabang (kode_cabang, nama_cabang)
VALUES
    ('C001', 'Jakarta'),
    ('C002', 'Surabaya'),
    ('C003', 'Bandung')
ON CONFLICT (kode_cabang) DO NOTHING;

INSERT INTO jabatan (kode_jabatan, nama_jabatan)
VALUES
    ('J001', 'Staff IT'),
    ('J002', 'Manager'),
    ('J003', 'Analyst')
ON CONFLICT (kode_jabatan) DO NOTHING;

INSERT INTO pegawai (
    kode_pegawai,
    nama_pegawai,
    kode_cabang,
    kode_jabatan,
    tanggal_mulai_kontrak,
    tanggal_habis_kontrak
)
VALUES
    ('P001', 'Budi Santoso', 'C001', 'J001', '2024-01-01', CURRENT_DATE + INTERVAL '10 day'),
    ('P002', 'Ani Rahayu', 'C002', 'J002', '2023-06-01', CURRENT_DATE + INTERVAL '25 day'),
    ('P003', 'Citra Dewi', 'C001', 'J003', '2024-03-01', CURRENT_DATE + INTERVAL '60 day'),
    ('P004', 'Doni Pratama', 'C003', 'J001', '2022-12-01', CURRENT_DATE + INTERVAL '5 day')
ON CONFLICT (kode_pegawai) DO NOTHING;
