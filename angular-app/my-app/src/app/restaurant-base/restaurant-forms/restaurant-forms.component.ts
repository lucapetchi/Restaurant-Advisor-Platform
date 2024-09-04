import { Component, OnInit } from '@angular/core';
import { switchMap } from 'rxjs/operators'
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Restaurant, RestaurantType } from '../../models/restaurant';
import { RestaurantService } from '../../services/restaurant.service';
import { CommonModule } from '@angular/common';
import { CommentComponent } from '../../comment/comment.component';

@Component({
  selector: 'app-restaurant-forms',
  templateUrl: './restaurant-forms.component.html',
  styleUrls: ['./restaurant-forms.component.scss']
})
export class RestaurantFormsComponent implements OnInit {
  restaurant!: Restaurant;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private restaurantService: RestaurantService) { }

  restaurantType: RestaurantType[] =[
    {
      key: 0,
      value: 'European'
    },
    {
      key: 1,
      value: 'Italian'
    }, 
    {
      key: 2,
      value: 'Lebanese'
    },
    {
      key: 3,
      value: 'Fast-food'
    },
    {
      key: 4,
      value: 'Japanese'
    },
]

  toggleIsOpen(event: any) {
    console.log(event);
  }

  log(object: any){
    console.log(object);
  }

  handleSubmit(object: any) {
    console.log(object);
  }

  ngOnInit() {
    this.restaurant = {} as Restaurant;
    this.route.params.subscribe((data: Params) => {
        return this.restaurantService.getRestaurant(data['id']).subscribe((data: Restaurant) => {
          this.restaurant = data;
      });
    })
  }

  back() : void {
    this.router.navigate(['/restaurant'])
  }
}