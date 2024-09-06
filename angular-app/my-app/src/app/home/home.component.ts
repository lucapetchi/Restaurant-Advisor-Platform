import { Component, OnInit } from '@angular/core';
import { RestaurantService } from '../services/restaurant.service';
import { CommentService } from '../services/comment.service';
import { AuthService } from '../services/auth.service';
import { Restaurant } from '../models/restaurant';
import { Comment } from '../models/comment';
import { User } from '../models/user';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  searchTerm: string = '';
  featuredRestaurants: Restaurant[] = [];
  recentReviews: Comment[] = [];
  currentUser?: User;
  email: string = '';

  constructor(
    private restaurantService: RestaurantService,
    private commentService: CommentService,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.loadFeaturedRestaurants();
    this.loadRecentReviews();
    this.authService.getMe().subscribe({
      next: (response) => {
        this.authService.currentUserSig.set(response);
      },
      error: () => {
        this.authService.currentUserSig.set(null);
      },
    });
  }

  onSearch(): void {
    console.log('Search term:', this.searchTerm);
    // Update search logic as needed
    this.loadFeaturedRestaurants();
  }

  loadFeaturedRestaurants(): void {
    this.restaurantService.getRestaurants(1, 3, this.searchTerm).subscribe(restaurants => {
      this.featuredRestaurants = restaurants;
    });
  }

  loadRecentReviews(): void {
    this.commentService.getComments(1, true).subscribe(reviews => {
      this.recentReviews = reviews;
    });
  }

  viewRestaurant(id: number): void {
    console.log('Viewing restaurant:', id);
    // Navigate or implement logic to view restaurant details
  }

  showLoginModal(): void {
    console.log('Show login modal');
    // Implement modal display logic if necessary
  }

  showRegisterModal(): void {
    console.log('Show register modal');
    // Implement modal display logic if necessary
  }

  isLoggedIn(): boolean {
    return this.authService.isLoggedIn();
  }

  subscribeToNewsletter(): void {
    console.log('Subscribed with email:', this.email);
    // Add newsletter subscription logic if needed
  }
}
