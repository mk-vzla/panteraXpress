import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AsientoPage } from './asiento.page';

describe('AsientoPage', () => {
  let component: AsientoPage;
  let fixture: ComponentFixture<AsientoPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(AsientoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
