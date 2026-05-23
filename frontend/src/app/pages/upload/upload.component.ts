import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatTableModule } from '@angular/material/table';
import { UploadDialogComponent } from '../../dialogs/upload-dialog/upload-dialog.component';
import { UploadedFile } from '../../models/pegawai.model';
import { ApiService } from '../../services/api.service';

@Component({
  selector: 'app-upload',
  standalone: true,
  imports: [CommonModule, MatButtonModule, MatCardModule, MatDialogModule, MatIconModule, MatTableModule],
  templateUrl: './upload.component.html',
  styleUrl: './upload.component.scss',
})
export class UploadComponent implements OnInit {
  columns = ['no', 'fileName', 'uploadDate'];
  files: UploadedFile[] = [];

  constructor(
    private readonly api: ApiService,
    private readonly dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadFiles();
  }

  loadFiles(): void {
    this.api.getFiles().subscribe((response) => (this.files = response.data));
  }

  openUploadDialog(): void {
    const ref = this.dialog.open(UploadDialogComponent, { width: '500px' });
    ref.afterClosed().subscribe((result) => {
      if (result) this.loadFiles();
    });
  }
}
