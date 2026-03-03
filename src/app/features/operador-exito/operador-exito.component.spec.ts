import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OperadorExitoComponent } from './operador-exito.component';

describe('OperadorExitoComponent', () => {
  let component: OperadorExitoComponent;
  let fixture: ComponentFixture<OperadorExitoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [OperadorExitoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(OperadorExitoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
