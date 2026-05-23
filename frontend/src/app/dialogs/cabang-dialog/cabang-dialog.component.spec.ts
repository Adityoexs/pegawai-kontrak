import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { CabangDialogComponent } from './cabang-dialog.component';

describe('CabangDialogComponent', () => {
  let component: CabangDialogComponent;
  let fixture: ComponentFixture<CabangDialogComponent>;
  let dialogRefSpy: jasmine.SpyObj<MatDialogRef<CabangDialogComponent>>;

  beforeEach(async () => {
    dialogRefSpy = jasmine.createSpyObj('MatDialogRef', ['close']);

    await TestBed.configureTestingModule({
      imports: [CabangDialogComponent, NoopAnimationsModule],
      providers: [
        { provide: MatDialogRef, useValue: dialogRefSpy },
        { provide: MAT_DIALOG_DATA, useValue: { isEdit: false } },
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(CabangDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should require kodeCabang and namaCabang', () => {
    component.save();

    expect(dialogRefSpy.close).not.toHaveBeenCalled();
    expect(component.form.invalid).toBeTrue();
  });

  it('should close with payload when form valid', () => {
    component.form.setValue({
      kodeCabang: 'CB01',
      namaCabang: 'Cabang Utama',
    });

    component.save();

    expect(dialogRefSpy.close).toHaveBeenCalledWith({
      kodeCabang: 'CB01',
      namaCabang: 'Cabang Utama',
    });
  });
});
