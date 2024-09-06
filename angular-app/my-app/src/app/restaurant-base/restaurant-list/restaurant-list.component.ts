import { AfterContentInit, AfterViewInit, Component, ContentChild, ContentChildren, ElementRef, OnInit, QueryList, Renderer2, ViewChild, ViewChildren } from '@angular/core';
import { AppComponent } from '../../app.component';
import { Restaurant, RestaurantType } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { RestaurantDetailComponent } from '../restaurant-detail/restaurant-detail.component';

@Component({
  selector: 'app-restaurant-list',
  templateUrl: './restaurant-list.component.html',
  styleUrls: ['./restaurant-list.component.scss']
})
export class RestaurantListComponent implements OnInit, AfterViewInit, AfterContentInit {
  restaurants: Restaurant[] = [];
  editingRestaurant: Restaurant | null = null;
  addingRestaurant: Restaurant | null = null;
  deletingRestaurant: Restaurant | null = null;
  lastId: number = 0;

  currentPage: number = 1;
  pageSize: number = 6;
  totalCount: number = 0;

  types: string[] = ["Italian","Romanesc","Mediterranean","Turkish","British","German","International","European"];           // pentru filtre.. deocamdata hardcodat:(
  priceRatings: number[] = [1, 2, 3, 4, 5]; 
  selectedType: string = '';
  selectedPriceRating: number | null = null;

  searchTerm: string = '';
  constructor(private restaurantService : RestaurantService, private renderer: Renderer2) { 
    
    
  }
  ngAfterContentInit(): void {

  }
  ngAfterViewInit(): void {

  }

  
  ngOnInit(): void {
    // this.restaurantService.getRestaurants().subscribe((data: Restaurant[]) => {
    //   console.log(data);
    //   this.restaurants = data;
    //   this.lastId=this.calculateLastId(this.restaurants) 
      
    // });
    this.loadRestaurants();
  }

 
  calculateLastId(restaurants: Restaurant[]): number {
    return restaurants.length > 0 ? Math.max(...restaurants.map(r => r.id)) : 0;
  }
  // handleDelete(event:any){
  //   this.deletingRestaurant= {...event};
  //   this.saveDelete();
  // }
  handleRemove(event: any) {
    this.restaurants = this.restaurants.filter((restaurant : Restaurant) => {
      return restaurant.id !== event.id;
    })
   
  }
  handleEdit(event: any) {
    this.editingRestaurant = { ...event };  // Clone the restaurant to edit
    
  }
  
  handleAdd( event:any ){
    this.addingRestaurant= {
      id: 0, name: '', type: '', isOpen: false, country: '', city: '', address: '',
      phone: '', price_Rating: 0, acceptTerms: false, image: '',comments:[]
    };
    console.log("handleAdd")
  }
  saveEdit() {
    if (this.editingRestaurant) {
      this.restaurantService.editRestaurant(this.editingRestaurant.id.toString(), this.editingRestaurant)
        .subscribe(
          updatedRestaurant => {
          this.restaurants = this.restaurants.map(restaurant =>
            restaurant.id === updatedRestaurant.id ? updatedRestaurant : restaurant
          );
          this.editingRestaurant = null;  
          console.log("Saved edited restaurant", updatedRestaurant);
        }, error => {
          console.error("Error ", error);
        });
    }
  }
  // saveDelete(){
  //   if(this.deletingRestaurant){
  //     this.restaurantService.deleteRestaurant(this.deletingRestaurant.id.toString()).subscribe();
  //     console.log("Deleted Restaurant",this.deletingRestaurant);
  //     this.deletingRestaurant=null;
  //   }
  // }

  saveAdd(){
    if (this.addingRestaurant){
      this.lastId += 1;
      this.addingRestaurant.id = this.lastId;
      this.restaurantService.addRestaurant(this.addingRestaurant)
      .subscribe(
      );
      console.log("Saved edited restaurant", this.addingRestaurant);
      this.addingRestaurant = null; 
    }
  }
  cancelEdit() {
    this.editingRestaurant = null;  
    
  }
  cancelAdd() {
    this.addingRestaurant = null;  
    
  }
 
  loadRestaurants(searchTerm: string = ''): void {
    this.restaurantService.getRestaurants(
      this.currentPage,
      this.pageSize,
      this.searchTerm,
      this.selectedType,
      this.selectedPriceRating
    ).subscribe((data: Restaurant[]) => {
      this.restaurants = data;
    });
  }
  onSearch(): void {
    this.loadRestaurants(this.searchTerm); // Call the loadRestaurants method with the current search term
  }
  nextPage(): void {
    this.currentPage++;
    this.loadRestaurants();
  }

  previousPage(): void {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.loadRestaurants();
    }
  }
  applyFilters(): void {
    this.currentPage = 1; // Reset to the first page
    this.loadRestaurants();
  }
  
  resetFilters(): void {
    this.selectedType = '';
    this.selectedPriceRating = null;
    this.applyFilters();
  }
}