import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { JabatanDialogComponent } from './jabatan-dialog.component';

describe('JabatanDialogComponent', () => {
  let component: JabatanDialogComponent;
  let fixture: ComponentFixture<JabatanDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<JabatanDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [JabatanDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { isEdit: false } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(JabatanDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should require kodeJabatan and namaJabatan', () => {
    component.save();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
    expect(component.form.invalid).toBeTrue();
  });

  it('should close with payload when form valid', () => {
    component.form.setValue({
      kodeJabatan: 'JB01',
      namaJabatan: 'Manager',
    });

    component.save();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      kodeJabatan: 'JB01',
      namaJabatan: 'Manager',
    });
  });
});
