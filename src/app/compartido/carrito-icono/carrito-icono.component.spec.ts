import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarritoIconoComponent } from './carrito-icono.component';

describe('CarritoIconoComponent', () => {
  let component: CarritoIconoComponent;
  let fixture: ComponentFixture<CarritoIconoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CarritoIconoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CarritoIconoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
