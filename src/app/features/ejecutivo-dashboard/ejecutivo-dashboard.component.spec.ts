import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EjecutivoDashboardComponent } from './ejecutivo-dashboard.component';

describe('EjecutivoDashboardComponent', () => {
  let component: EjecutivoDashboardComponent;
  let fixture: ComponentFixture<EjecutivoDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EjecutivoDashboardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EjecutivoDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
