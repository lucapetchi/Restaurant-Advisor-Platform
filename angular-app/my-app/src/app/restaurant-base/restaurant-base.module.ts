import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';

//Components
import { RestaurantDetailComponent } from './restaurant-detail/restaurant-detail.component';
import { RestaurantListComponent } from './restaurant-list/restaurant-list.component';
//Services
import { RestaurantService } from '../services/restaurant.service';
import { RouterModule, Routes } from '@angular/router';
import { RestaurantFormsComponent } from './restaurant-forms/restaurant-forms.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommentComponent } from '../comment/comment.component';
import { AuthService } from '../services/auth.service';
import { authInterceptor } from '../auth/auth.interceptor';
import { RestaurantPageComponent } from './restaurant-page/restaurant-page.component';
import { MapComponent } from '../map/map.component';




const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: RestaurantListComponent },
      { path: ':id', component: RestaurantPageComponent}
      
    ]
  }
];


@NgModule({
  declarations: [
    RestaurantListComponent,
    RestaurantDetailComponent,
    RestaurantFormsComponent,
    RestaurantPageComponent,
    CommentComponent,
    MapComponent
    
    
  
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RestaurantListComponent,
    RestaurantDetailComponent,
    RestaurantFormsComponent,
    CommentComponent,
    RouterModule
  ],
  providers: [
    RestaurantService,
    AuthService
    
  ],
  bootstrap: []
})
export class RestaurantBaseModule { }