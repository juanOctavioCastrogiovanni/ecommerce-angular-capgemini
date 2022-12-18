import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItemPagoComponent } from './item-pago.component';

describe('ItemPagoComponent', () => {
  let component: ItemPagoComponent;
  let fixture: ComponentFixture<ItemPagoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItemPagoComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ItemPagoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
