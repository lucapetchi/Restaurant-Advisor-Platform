import { AfterContentInit, Component, ContentChild, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList } from '@angular/core';
import { Restaurant } from '../../models/restaurant';
import { RestaurantListComponent } from '../restaurant-list/restaurant-list.component';

@Component({
  selector: 'app-restaurant-detail',
  templateUrl: './restaurant-detail.component.html',
  styleUrls: ['./restaurant-detail.component.scss']
})
export class RestaurantDetailComponent implements OnInit, AfterContentInit {
  @ContentChildren("contentRef") contentList!: any;
  @Input()
  detail!: Restaurant;

  @Output()edit: EventEmitter<any> = new EventEmitter();
  @Output()remove: EventEmitter<any> = new EventEmitter();
  @Output()add: EventEmitter<Restaurant> = new EventEmitter();

  constructor() {
  }
  ngAfterContentInit(): void {
    console.log(this.contentList);
  }

  ngOnInit(): void {
  }

  onRemove() {
    this.remove.emit(this.detail);
  }
  onEdit() {
    this.edit.emit(this.detail);
  }

  onAdd(){
    this.add.emit(this.detail);
  }
  private imageBaseUrl = 'http://192.168.1.133:8080/images/restaurants/';

  // functie pentru a gasi image url in functie de numele restaurantului : Ex: alt-shift =>url/alt-shift.jpg
  getImageUrl(name: string): string {
    return `${this.imageBaseUrl}${name}.jpg`;
  }
}