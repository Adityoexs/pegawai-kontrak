import { HttpErrorResponse } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { of, throwError } from 'rxjs';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadDialogComponent } from './upload-dialog.component';
import { ApiService } from '../../services/api.service';

describe('UploadDialogComponent', () => {
  let apiSpy: jasmine.SpyObj<ApiService>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<UploadDialogComponent>>;

  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj<ApiService>('ApiService', ['uploadFile']);
    dialogRefSpy = jasmine.createSpyObj<MatDialogRef<UploadDialogComponent>>('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [UploadDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: ApiService, useValue: apiSpy },
        { provide: MatDialogRef, useValue: dialogRefSpy },
      ],
    }).compileComponents();
  });

  it('should set the selected file from the file input event', () => {
    const fixture = TestBed.createComponent(UploadDialogComponent);
    const component = fixture.componentInstance;
    const file = new File(['content'], 'pegawai.xlsx');

    component.onFileSelected({ target: { files: [file] } } as unknown as Event);

    expect(component.selectedFile).toBe(file);
  });

  it('should upload the selected file and close the dialog on success', () => {
    const fixture = TestBed.createComponent(UploadDialogComponent);
    const component = fixture.componentInstance;
    const openSpy = spyOn(component['snack'], 'open');
    const file = new File(['content'], 'pegawai.xlsx');
    component.selectedFile = file;
    apiSpy.uploadFile.and.returnValue(of({ success: true, message: '', data: {} as never }));

    component.upload();

    expect(apiSpy.uploadFile).toHaveBeenCalledWith(file);
    expect(openSpy).toHaveBeenCalledWith('File berhasil diunggah!', 'OK', { duration: 3000 });
    expect(dialogRefSpy.close).toHaveBeenCalledWith(true);
    expect(component.uploading).toBeFalse();
  });

  it('should show an error message when upload fails', () => {
    const fixture = TestBed.createComponent(UploadDialogComponent);
    const component = fixture.componentInstance;
    const openSpy = spyOn(component['snack'], 'open');
    component.selectedFile = new File(['content'], 'pegawai.xlsx');
    apiSpy.uploadFile.and.returnValue(
      throwError(() => new HttpErrorResponse({ error: { message: 'Format tidak valid' } }))
    );

    component.upload();

    expect(openSpy).toHaveBeenCalledWith('Gagal upload: Format tidak valid', 'OK', { duration: 4000 });
    expect(dialogRefSpy.close).not.toHaveBeenCalled();
    expect(component.uploading).toBeFalse();
  });
});
