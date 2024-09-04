import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RestaurantService } from '../../services/restaurant.service';
import { Restaurant } from '../../models/restaurant';
import { RestaurantBaseModule } from '../restaurant-base.module';
import { CommonModule } from '@angular/common';
import { Comment } from '../../models/comment';
import { User } from '../../models/user';
import { AuthService } from '../../services/auth.service';
import { CommentService } from '../../services/comment.service';


@Component({
  selector: 'app-restaurant-page',
  templateUrl: './restaurant-page.component.html',
  styleUrls: ['./restaurant-page.component.scss']
})
export class RestaurantPageComponent implements OnInit {
  restaurant: Restaurant | any;
  newComment: Comment = {
    id: 0,
    title: '',
    content: '',
    rating: 0,
    createdOn: new Date(),
    restaurantId: 0,
    restaurant: {} as Restaurant,
    appUserId: '',
    appUser: {} as User
  };
  currentUser: User | null | undefined = null;
  constructor(
    private route: ActivatedRoute,
    private restaurantService: RestaurantService,
    private authService: AuthService,
    private commentService: CommentService

  ) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.restaurantService.getRestaurant(id).subscribe(
        (data: Restaurant) => {
          this.restaurant = data;
          console.log(this.restaurant);
        },
        (error) => {
          console.error('Error fetching restaurant data', error);
        }
      );
    }
    this.currentUser = this.authService.currentUserSig();
  }
  onSubmit(restaurantId: number): void {
    if (this.currentUser) {
      this.newComment.appUser = this.currentUser;
      this.newComment.restaurant=this.restaurant;
      this.newComment.appUserId = this.currentUser.userName; // Set the user who is making the comment
      this.newComment.restaurantId = restaurantId; // Set the restaurant ID
      this.commentService.createComment(restaurantId, this.newComment).subscribe(
        (comment) => {
          console.log('Comment added successfully', comment);
          // Optionally reset the form or update the UI
          this.newComment = {
            id: 0,
            title: '',
            content: '',
            rating: 0,
            createdOn: new Date(),
            restaurantId: 0,
            restaurant: {} as Restaurant,
            appUserId: '',
            appUser: {} as User
          };
          this.hideForm();
          this.refreshPage();
        },
        (error) => {
          console.error('Error adding comment', error);
        }
      );
    } else {
      console.error('User not logged in');
    }
  }

  hideForm(): void {
    const formElement = document.getElementById('commentForm');
    if (formElement) {
      formElement.style.display = 'none';
    }
  }
  
  refreshPage(): void {
    setTimeout(() => {
      window.location.reload();
    }, 500);
  }

}
