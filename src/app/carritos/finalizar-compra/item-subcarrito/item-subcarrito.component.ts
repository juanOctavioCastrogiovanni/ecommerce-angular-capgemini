import { Component, Input } from '@angular/core';
import { Item } from '../../interfaces/carrito.interface';

@Component({
  selector: 'app-item-subcarrito',
  templateUrl: './item-subcarrito.component.html',
})
export class ItemSubcarritoComponent {
  @Input() item: Item | undefined;
}
