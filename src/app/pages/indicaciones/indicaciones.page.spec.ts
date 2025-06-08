import { ComponentFixture, TestBed } from '@angular/core/testing';
import { IndicacionesPage } from './indicaciones.page';

describe('IndicacionesPage', () => {
  let component: IndicacionesPage;
  let fixture: ComponentFixture<IndicacionesPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(IndicacionesPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
