import { of } from 'rxjs';
import { TestBed } from '@angular/core/testing';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { MatDialogRef } from '@angular/material/dialog';
import { UploadComponent } from './upload.component';
import { UploadDialogComponent } from '../../dialogs/upload-dialog/upload-dialog.component';
import { ApiService } from '../../services/api.service';

describe('UploadComponent', () => {
  let apiSpy: jasmine.SpyObj<ApiService>;

  beforeEach(async () => {
    apiSpy = jasmine.createSpyObj<ApiService>('ApiService', ['getFiles']);
    apiSpy.getFiles.and.returnValue(of({ success: true, message: '', data: [] }));

    await TestBed.configureTestingModule({
      imports: [UploadComponent, NoopAnimationsModule],
      providers: [{ provide: ApiService, useValue: apiSpy }],
    }).compileComponents();
  });

  it('should load files on init', () => {
    const fixture = TestBed.createComponent(UploadComponent);

    fixture.detectChanges();

    expect(apiSpy.getFiles).toHaveBeenCalled();
    expect(fixture.componentInstance.files).toEqual([]);
  });

  it('should open the upload dialog and reload files after success', () => {
    const fixture = TestBed.createComponent(UploadComponent);
    fixture.detectChanges();
    apiSpy.getFiles.calls.reset();
    const openSpy = spyOn(fixture.componentInstance['dialog'], 'open').and.returnValue({
      afterClosed: () => of(true),
    } as MatDialogRef<UploadDialogComponent>);

    fixture.componentInstance.openUploadDialog();

    expect(openSpy).toHaveBeenCalledWith(UploadDialogComponent, { width: '500px' });
    expect(apiSpy.getFiles).toHaveBeenCalled();
  });
});
