import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorUploadComponent } from './operador-upload.component';

describe('OperadorUploadComponent', () => {
  let component: OperadorUploadComponent;
  let fixture: ComponentFixture<OperadorUploadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperadorUploadComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadorUploadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
